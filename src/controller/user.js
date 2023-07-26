import { Op } from 'sequelize';
import { generate } from '../helpers/bcrypt';
import UserService from '../database/services/user';
import out from '../helpers/response';
import { sign } from '../helpers/jwt';
import mailer from '../helpers/mailer';
import config from '../config';

class UserController {
  static async userSignUp(req, res) {
    try {
      const {
        firstName, lastName, email, userName, password, phone_number
      } = req.body;

      const user = await UserService.findUser({
        [Op.or]: [{ email }, { userName }]
      });

      if (user) {
        return out(res, 409, 'The user with this Email or User name already exists!', null, 'CONFLICT_ERROR');
      }

      const hashedPassword = await generate(password);
      const userData = await UserService.addUser({
        firstName,
        lastName,
        email,
        userName,
        password: hashedPassword,
        phone_number,
        isVerified: false
      });

      const verificationToken = sign({
        userName,
        email,
        functionality: 'signupVerificationLink'
      });

      const URL = `${config.FRONTEND_URL}/api/user/signUp/${verificationToken}`;
      const emailSent = await mailer(
        'Verification-Link',
        {
          email,
          URL,
        },
        config.SENDGRID_EMAIL_RECEIVER
      );
      if (!emailSent) throw Error('Error sending the email');
      return out(res, 201, 'User successfully created', userData);
    } catch (error) {
      return out(res, 500, error.message || error, null, 'SERVER_ERROR');
    }
  }
}
export default UserController;
