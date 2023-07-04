import { generate, check } from '../helpers/bcrypt';
import DepartmentService from '../database/services/department';
import DoctorService from '../database/services/doctor';
import out from '../helpers/response';
import { generateRandomNumber } from '../helpers/randomNumber';
import { sign, verify } from '../helpers/jwt';
import mailer from '../helpers/mailer';
import config from '../config';

class DoctorController {
  static async addDoctor(req, res) {
    try {
      const {
        firstName, lastName, email, departments
      } = req.body;

      const departmentDuplicates = departments.filter(
        (item, index) => departments.indexOf(item) !== index
      );
      if (departmentDuplicates.length > 0) {
        return out(res, 400, 'There is duplicates in departments array', null, 'BAD_REQUEST');
      }

      const emailExist = await DoctorService.findDoctor({ where: { email } });
      if (emailExist) return out(res, 409, `The doctor with this Email ${email}  already exist!`, null, 'CONFLICT_ERROR');

      const theDepartments = await DepartmentService.fetchDepartmentsByIds(departments);
      if (theDepartments.length !== departments.length) {
        return out(res, 400, 'One or more departments do not exist!', null, 'BAD_REQUEST');
      }

      const password = generateRandomNumber();
      const hashedPassword = await generate(password);

      const doctor = await DoctorService.addDoctor({
        firstName,
        lastName,
        email,
        departments,
        password: hashedPassword,
        isVerified: false
      });

      const { password: _, ...doctorWithoutPassword } = doctor.dataValues;
      const emailSent = await mailer(
        'doctor-registration',
        {
          email: doctor.email,
          password,
          name: `${doctor.firstName} ${doctor.lastName}`
        },
        config.SENDGRID_EMAIL_RECEIVER
      );
      if (!emailSent) throw Error('Error sending the email');
      return out(res, 201, 'Doctor successfully added', doctorWithoutPassword);
    } catch (error) {
      return out(res, 500, error.message || error, null, 'SERVER_ERROR');
    }
  }

  static async doctorLogin(req, res) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return out(res, 422, 'One of the fields is empty or not provided', null, 'VALIDATION_ERROR');
      }
      const doctorExist = await DoctorService.findDoctor({ where: { email } });
      let validPassword;
      if (doctorExist) {
        validPassword = await check(doctorExist.password, password);
      }

      if (!doctorExist || !validPassword) return out(res, 400, 'Invalid email or password', null, 'BAD_REQUEST');

      const token = sign({
        email: doctorExist.email,
        role: 'Doctor'
      });
      const data = {
        token,
        email,
        role: 'Doctor',
        logginTime: `${new Date().toLocaleDateString()}, ${new Date().toLocaleTimeString()}`
      };
      return out(res, 200, 'Login successful', data);
    } catch (error) {
      return out(res, 500, error.message || error, null, 'SERVER_ERROR');
    }
  }

  static async getDoctorProfile(req, res) {
    try {
      const { email } = req.user;

      const doctorProfile = await DoctorService.findDoctorProfile({ where: { email } });

      return out(res, 200, 'Doctor profile retrieved successfully', doctorProfile);
    } catch (error) {
      return out(res, 500, error.message || error, null, 'SERVER_ERROR');
    }
  }

  static async doctorChangeDefaultPassword(req, res) {
    try {
      const { oldPassword, newPassword } = req.body;
      const { email } = req.user;

      const doctorExist = await DoctorService.findDoctor({ where: { email } });
      if (!doctorExist) return out(res, 404, 'Account not found', null, 'BAD_REQUEST');

      const isMatch = check(doctorExist.password, oldPassword);
      if (!isMatch) return out(res, 401, 'Incorrect previous password', null, 'AUTHENTICATION ERROR');

      const newMatchesOld = check(doctorExist.password, newPassword);
      if (newMatchesOld) return out(res, 401, 'Previous password must not match new password', null, 'AUTHENTICATION ERROR');

      const hashedPassword = await generate(newPassword);
      const doctorToUpdate = { password: hashedPassword };
      await DoctorService.updateDoctor(email, doctorToUpdate);

      return out(res, 200, 'Password changed successfully');
    } catch (error) {
      return out(res, 500, error.message || error, null, 'SEVER_ERROR');
    }
  }

  static async doctorEditProfile(req, res) {
    try {
      const { email } = req.user;

      const doctorToUpdateExist = await DoctorService.findDoctor({ where: { email } });
      if (!doctorToUpdateExist) {
        return out(res, 404, 'This doctor does not exist', null, 'BAD_REQUEST');
      }
      await DoctorService.updateDoctor(email, req.body);

      Object.assign(doctorToUpdateExist, req.body);
      const { password: _, ...doctorWithoutPassword } = doctorToUpdateExist.dataValues;

      return out(res, 200, 'Profile updated successfully', doctorWithoutPassword);
    } catch (error) {
      return out(res, 500, error.message || error, null, 'SERVER_ERROR');
    }
  }

  static async forgotDoctorPassword(req, res) {
    try {
      const { email } = req.body;

      const doctorExist = await DoctorService.findDoctor({ where: { email } });
      if (!doctorExist) return out(res, 404, 'This email is not registered!', null, 'BAD_REQUEST');

      const resetToken = sign({
        id: doctorExist.id,
        email: doctorExist.email,
        functionality: 'toResetPassword'
      }, { expiresIn: 600 });

      return out(res, 200, 'Reset token generated successful', resetToken);
    } catch (error) {
      return out(res, 500, error.message || error, null, 'SERVER_ERROR');
    }
  }

  static async resetDoctorPassword(req, res) {
    try {
      const { newPassword, confirmPassword } = req.body;
      const { resetToken } = req.params;

      if (newPassword !== confirmPassword) {
        return out(res, 400, 'Please provide the same password!', null, 'BAD_REQUEST');
      }
      // const token = resetToken.split(' ')[1];
      const validResetToken = verify(resetToken);

      if (!validResetToken || validResetToken.functionality !== 'toResetPassword') {
        return out(res, 403, 'You don\'t have access to do that action', null, 'FORBIDDEN');
      }

      const hashedPassword = await generate(newPassword);
      await DoctorService.updatePassword(hashedPassword, validResetToken.id);

      return out(res, 200, 'Password reseted successfully');
    } catch (error) {
      return out(res, 500, error.message || error, null, 'SERVER_ERROR');
    }
  }
}

export default DoctorController;
