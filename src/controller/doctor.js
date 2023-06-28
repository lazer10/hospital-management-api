import { generate, check } from '../helpers/bcrypt';
import DepartmentService from '../database/services/department';
import DoctorService from '../database/services/doctor';
import out from '../helpers/response';
import { generateRandomNumber } from '../helpers/randomNumber';
import { sign } from '../helpers/jwt';
import mailer from '../helpers/mailer';
import config from '../config';
import data from '../database/models';

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
      const Data = {
        token,
        email,
        role: 'Doctor',
        logginTime: `${new Date().toLocaleDateString()}, ${new Date().toLocaleTimeString()}`
      };
      return out(res, 200, 'Login successful', Data);
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

      const doctorExist = await data.Doctor.findOne({ where: { email } });
      if (!doctorExist) return out(res, 404, 'Doctor no longer exist', null, 'BAD_REQUEST');

      const isMatch = check(doctorExist.password, oldPassword);
      if (!isMatch) return out(res, 401, 'Incorrect previous password', null, 'AUTHENTICATION ERROR');

      const newMatchesOld = check(doctorExist.password, newPassword);
      if (newMatchesOld) return out(res, 401, 'Previous password must not match new password', null, 'AUTHENTICATION ERROR');

      const hashedPassword = await generate(newPassword);
      await DoctorService.changeDoctorPassword(email, hashedPassword);

      return out(res, 200, 'Password changed successfully');
    } catch (error) {
      return out(res, 500, error.message || error, null, 'SEVER_ERROR');
    }
  }

  static async doctorEditProfile(req, res) {
    try {
      const { email } = req.user;

      const doctorToUpdateExist = await data.Doctor.findOne({ where: { email } });
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
}

export default DoctorController;
