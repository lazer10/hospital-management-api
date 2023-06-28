import data from '../models';

class DoctorService {
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

  static async findDoctorProfile() {
    try {
      return await data.Doctor.findOne({
        attributes: { exclude: ['password'] }
      });
    } catch (error) {
      throw error;
    }
  }

  static async findDoctors() {
    try {
      return await data.Doctor.findAll({
        attributes: { exclude: ['id', 'password', 'createdAt', 'updatedAt'] }
      });
    } catch (error) {
      throw error;
    }
  }

  static async changeDoctorPassword(email, hashedPassword) {
    try {
      await data.Doctor.update({ password: hashedPassword }, { where: { email } });
      return null;
    } catch (error) {
      throw error;
    }
  }

  static async updateDoctor(email, doctorToUpdate) {
    try {
      await data.Doctor.update(doctorToUpdate, { where: { email } });

      return doctorToUpdate;
    } catch (error) {
      throw error;
    }
  }
}
export default DoctorService;
