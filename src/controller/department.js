import DepartmentService from '../database/services/department';
import out from '../helpers/response';

class DepartmentController {
  static async addDepartment(req, res) {
    try {
      const { name } = req.body;
      const created_at_milli = new Date().getTime();
      req.body.created_at_milli = created_at_milli;
      const nameExist = await DepartmentService.findDepartment({ where: { name } });
      if (nameExist) return out(res, 409, 'Name provided already exist!', null, 'CONFLICT_ERROR');
      const createdDepartment = await DepartmentService.addDepartment(req.body);
      return out(res, 201, 'Department added successfully', createdDepartment, null);
    } catch (error) {
      return out(res, 500, error.message || error, null, 'SERVER_ERROR');
    }
  }

  static async fetchAllDepartments(req, res) {
    try {
      const allDepartments = await DepartmentService.fecthDepartments();
      if (allDepartments.length === 0) return out(res, 404, 'No department found', null, 'NOT_FOUND');

      return out(res, 200, 'Departments retrieved successfully', allDepartments, null);
    } catch (error) {
      return out(res, 500, error.message || error, null, 'SERVER_ERROR');
    }
  }

  static async fetchDepartmentById(req, res) {
    try {
      const { id } = req.params;
      if (!Number(id)) {
        return out(res, 400, 'Please use numerics to search!', null, 'BAD_REQUEST');
      }

      // eslint-disable-next-line max-len
      const singleDepartment = await DepartmentService.fecthDepartmentwithID(id);
      if (!singleDepartment) {
        return out(res, 404, `Whoops! We can't find department with this id ${id}!`, null, 'NOT_FOUND');
      }
      return out(res, 200, `Department with id ${id} successfully retreived!`, singleDepartment);
    } catch (error) {
      return out(res, 500, error.message || error, null, 'SERVER_ERROR');
    }
  }

  static async updateDepartmentById(req, res) {
    try {
      const updatedDepartment = req.body;
      const { id } = req.params;
      if (!Number(id)) {
        return out(res, 400, 'Please use numerics to search!', null, 'BAD_REQUEST');
      }
      const departmentExist = await DepartmentService.findDepartment({
        where: { id: Number(id) }
      });
      if (!departmentExist) {
        return out(res, 404, `Whoops! We can't find department with this id ${id}!`, null, 'NOT_FOUND');
      }

      const updateDepartment = await DepartmentService.updateDepartment(id, updatedDepartment);
      return out(res, 200, `Department with id ${id} successfully updated!`, updateDepartment);
    } catch (error) {
      return out(res, 500, error.message || error, null, 'SERVER_ERROR');
    }
  }
}

export default DepartmentController;
