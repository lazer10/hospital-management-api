import { generate, check } from '../helpers/bcrypt';
import DepartmentService from '../database/services/department';
import DoctorService from '../database/services/doctor';
import out from '../helpers/response';
import { generateRandomNumber } from '../helpers/randomNumber';
import { sign } from '../helpers/jwt';
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
}

export default DoctorController;
