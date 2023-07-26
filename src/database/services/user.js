import data from '../models';

class UserService {
  static async addUser(newUser) {
    try {
      return await data.User.create(newUser);
    } catch (error) {
      throw error;
    }
  }

  static async findUser(filter) {
    try {
      return await data.User.findOne({
        where: {
          [data.Sequelize.Op.or]: filter,
        },
      });
    } catch (error) {
      throw error;
    }
  }
}
export default UserService;
