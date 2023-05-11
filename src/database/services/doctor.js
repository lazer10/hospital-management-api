import model from '../models';

const { Doctor } = model;
class departmentservice {
  static async addDoctor(newDoctor) {
    try {
      return await Doctor.create(newDoctor);
    } catch (error) {
      throw error;
    }
  }

  static async findDoctor(newDoctor) {
    try {
      return await Doctor.findOne(newDoctor);
    } catch (error) {
      throw error;
    }
  }

  static async findAll(newDoctor) {
    try {
      return await Doctor.findOne(newDoctor);
    } catch (error) {
      throw error;
    }
  }
}
export default departmentservice;
