import data from '../models';

class UserService {
  static async updateUser(userToUpdate, email) {
    try {
      const user = await data.User.findOne({ where: { email } });
      if (!user) {
        throw new Error('User not found');
      }
      return await user.update(userToUpdate);
    } catch (error) {
      throw error;
    }
  }

}
export default UserService;
