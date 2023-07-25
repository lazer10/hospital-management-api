import { Op } from 'sequelize';
import data from '../models';

class UserService {
  static async findDoctor(newDoctor) {
    try {
      return await data.Doctor.findOne(newDoctor);
    } catch (error) {
      throw error;
    }
  }

  static async updateDoctor(doctorToUpdate, email) {
    try {
      await data.Doctor.update(doctorToUpdate, { where: { email } });
      return doctorToUpdate;
    } catch (error) {
      throw error;
    }
  }

}
export default UserService;
