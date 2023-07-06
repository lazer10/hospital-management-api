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

  static async changeDoctorPassword(hashedPassword, email) {
    try {
      const doctor = await data.Doctor.findOne({ where: { email } });

      if (!doctor) {
        throw new Error('Doctor not found');
      }
      doctor.password = hashedPassword;
      await doctor.save();

      return null;
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
export default DoctorService;
