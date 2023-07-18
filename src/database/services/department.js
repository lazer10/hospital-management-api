import { Op } from 'sequelize';
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

  static async fetchDepartmentsByIds(departments) {
    try {
      return await data.Department.findAll({
        where: { id: departments }
      });
    } catch (error) {
      throw Error;
    }
  }

  static async fecthDepartments() {
    try {
      return await data.Department.findAll();
    } catch (error) {
      throw error;
    }
  }

  static async fetchDepartment(id) {
    try {
      return await data.Department.findOne({ where: { id } });
    } catch (error) {
      throw error;
    }
  }

  static async updateDepartment(id, updateDepartment) {
    try {
      await data.Department.update(updateDepartment, { where: { id } });

      return updateDepartment;
    } catch (error) {
      throw error;
    }
  }

  static async searchDepartments(searchTerm) {
    try {
      const departments = await data.Department.findAll({
        where: {
          [Op.or]: [
            { name: { [Op.iLike]: `%${searchTerm}%` } }
          ]
        },
        attributes: ['id', 'name', 'createdAt', 'updatedAt']
      });
      return departments;
    } catch (error) {
      throw error;
    }
  }
}

export default departmentservice;
