import { generate, check } from '../helpers/bcrypt';
import DepartmentService from '../database/services/department';
import DoctorService from '../database/services/doctor';
import out from '../helpers/response';
import { generateRandomNumber } from '../helpers/randomNumber';
import { sign } from '../helpers/jwt';

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
      console.log('before harshed', password);
      const { password: _, ...doctorWithoutPassword } = doctor.dataValues;

      return out(res, 201, 'Doctor successfully added', doctorWithoutPassword);
    } catch (error) {
      return out(res, 500, error.message || error, null, 'SERVER_ERROR');
    }
  }

  static async doctorLogin(req, res) {
    try {
      const { email, password } = req.body;

      const emailExist = await DoctorService.findDoctor({ where: { email } });
      if (!emailExist) return out(res, 400, 'Invalid email or password', null, 'BAD_REQUEST');

      const passwordExist = await DoctorService.findDoctor({ where: { password } });
      // const validP = check(password, passwordExist.password);
      if (!passwordExist) return out(res, 400, 'Invalid email or password', null, 'BAD_REQUEST');

      // if (email !== emailExist.email || password !== passwordExist.password) {
      //   return out(res, 400, 'Invalid email or password', null, 'BAD_REQUEST');
      // }
      const token = sign({
        email: emailExist.email,
        role: 'Doctor'
      });
      const data = {
        token,
        email,
        role: 'Doctor',
        logginTime: `${new Date().toLocaleDateString()}, ${new Date().toLocaleTimeString()}`
      };
      return out(res, 200, 'Login successful', data, null);
    } catch (error) {
      return out(res, 500, error.message || error, null, 'SERVER_ERROR');
    }
  }

  static async fetchAllDoctors(req, res) {
    try {
      const allDoctors = await DoctorService.findDoctors();
      if (allDoctors.length === 0) return out(res, 404, 'No Doctor found', null, 'NOT_FOUND');
      return out(res, 200, 'Doctors retrieved successfully', allDoctors, null);
    } catch (error) {
      return out(res, 500, error.message || error, null, 'SERVER_ERROR');
    }
  }
}

export default DoctorController;
