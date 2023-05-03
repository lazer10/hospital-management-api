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

  static async fecthDepartments() {
    try {
      return await data.Department.findAll();
    } catch (error) {
      throw error;
    }
  }

  static async fecthDepartmentwithID(id) {
    try {
      return await data.Department.findOne({ where: { id: Number(id) } });
    } catch (error) {
      throw error;
    }
  }

  static async updateDepartment(id, updateDepartment) {
    try {
      return await data.Department.update(updateDepartment, { where: { id: Number(id) } });
    } catch (error) {
      throw error;
    }
  }
}

export default departmentservice;
