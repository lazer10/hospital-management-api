import data from '../models';

class DepartmentService {
  static async addDoctor(newDoctor) {
    try {
      return await data.Doctor.create(newDoctor);
    } catch (error) {
      throw error;
    }
  }

  static async findDoctor(newDoctor) {
    try {
      return await data.Doctor.findOne(newDoctor);
    } catch (error) {
      throw error;
    }
  }
}
export default DepartmentService;
