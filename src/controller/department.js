import DepartmentService from '../database/services/department';
import out from '../helpers/response';

class DepartmentController {
  static async addDepartment(req, res) {
    try {
      const { name } = req.body;
      const created_at_milli = new Date().getTime();
      req.body.created_at_milli = created_at_milli;
      if (!name) {
        return out(res, 400, 'Please provide department name', null, 'BAD_REQUEST');
      }
      const createdDepartment = await DepartmentService.addDepartment(req.body);
      const data = {
        createdDepartment
      };
      return out(res, 201, 'Department added successfully', data, null);
    } catch (error) {
      return out(res, 500, error.message || error, null, 'SERVER_ERROR');
    }
  }
}

export default DepartmentController;
