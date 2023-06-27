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

  static async updateDoctor(email, doctor) {
    try {
      const doctorToUpdate = await data.Doctor.findOne({ where: { email } });
      if (!doctorToUpdate) {
        throw new Error('Doctor not found');
      }

      doctorToUpdate.firsName = doctor;
      doctorToUpdate.lastName = doctor;
      doctorToUpdate.departments = doctor;
      await doctor.save();

      return doctor;
    } catch (error) {
      throw error;
    }
  }
}
export default DoctorService;
