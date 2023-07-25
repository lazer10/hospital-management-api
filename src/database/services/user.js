import { Op } from 'sequelize';
import data from '../models';

class UserService {
  static async addUser(newUser) {
    try {
      const { password, ...userWithoutPassword } = newUser;
      return await data.User.create(userWithoutPassword);
    } catch (error) {
      throw error;
    }
  }

  static async findUser({ email, userName }) {
    try {
      return await data.User.findOne({
        where: {
          [Op.or]: [{ email }, { userName }]
        }
      });
    } catch (error) {
      throw error;
    }
  }
  
}
export default UserService;
