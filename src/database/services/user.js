import data from '../models';

class UserService {
  static async addUser(newDoctor) {
    try {
      return await data.User.create(newDoctor);
    } catch (error) {
      throw error;
    }
  }

  static async findUser(newUser) {
    try {
      return await data.User.findOne(newUser);
    } catch (error) {
      throw error;
    }
  }

}
export default UserService;
