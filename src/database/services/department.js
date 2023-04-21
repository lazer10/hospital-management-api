import data from '../models';

class departmentservice {
  static async addDepartment(newDepartment) {
    try {
      return await data.Department.create(newDepartment);
    } catch (error) {
      throw error;
    }
  }

  static async findDepartment(newDepartment) {
    try {
      return await data.Department.findOne(newDepartment);
    } catch (error) {
      throw error;
    }
  }
}

export default departmentservice;
