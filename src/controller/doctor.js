import { generate } from '../helpers/bcrypt';
import DepartmentService from '../database/services/department';
import DoctorService from '../database/services/doctor';
import out from '../helpers/response';
import { generateRandomNumber } from '../helpers/randomNumber';

class DoctorController {
  static async addDoctor(req, res) {
    try {
      const {
        firstName, lastName, email, departments
      } = req.body;

      const emailExist = await DoctorService.findDoctor({ where: { email } });
      if (emailExist) return out(res, 409, `The doctor with this Email ${email}  already exist!`, null, 'CONFLICT_ERROR');

      const theDepartments = await DepartmentService.fetchDepartmentsByIds(departments);
      if (!theDepartments) {
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
      const data = { doctor: doctorWithoutPassword };

      return out(res, 201, 'Doctor successfully added', data);
    } catch (error) {
      return out(res, 500, error.message || error, null, 'SERVER_ERROR');
    }
  }
}

export default DoctorController;
