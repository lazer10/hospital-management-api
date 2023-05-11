import bcrypt from 'bcryptjs';
import DepartmentService from '../database/services/department';
import DoctorService from '../database/services/doctor';
import out from '../helpers/response';

class DoctorController {
  static async addDoctor(req, res) {
    try {
      const {
        firstName, lastName, email, departments
      } = req.body;
      const password = Math.random().toString(36).substring(2, 8);
      const hashedPassword = await bcrypt.hash(password, 10);

      const emailExist = await DoctorService.findDoctor({ where: { email } });
      if (emailExist) return out(res, 409, `The doctor with this Email ${email}  already exist!`, null, 'CONFLICT_ERROR');

      const thedepartments = await DepartmentService.findDepartment({
        where: { id: departments }
      });

      if (!thedepartments) return out(res, 404, `Departments with Id ${departments} does't exist!`, null, 'NOT_FOUND_ERROR');

      const doctor = await DoctorService.addDoctor({
        firstName,
        lastName,
        email,
        password: hashedPassword,
        departments,
        isVerified: false
      });

      await doctor.thedepartments;
      const data = {
        doctor, hashedPassword
      };
      return out(res, 201, 'Doctor successfully added', data);
    } catch (error) {
      return out(res, 500, error.message || error, null, 'SERVER_ERROR');
    }
  }
}

export default DoctorController;
