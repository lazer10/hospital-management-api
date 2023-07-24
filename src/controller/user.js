import { generate, check } from '../helpers/bcrypt';
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

      const emailExist = await UserService.findUser({ where: { email } });
      if (emailExist) return out(res, 409, `The user with this Email ${email}  already exist!`, null, 'CONFLICT_ERROR');

      const userNameExist = await UserService.findUser({ where: { userName } });
      if (userNameExist) return out(res, 409, `The user with this user name ${userName}  already exist!`, null, 'CONFLICT_ERROR');
      
      const hashedPassword = await generate(password);
      const user = await UserService.addUser({
        firstName,
        lastName,
        email,
        userName,
        password: hashedPassword,
        phone_number,
        isVerified: false
      });

      const { password: _, ...userWithoutPassword } = user.dataValues;
      const verificationLink = sign({
        userName,
        email,
        functionality: 'signupVerificationLink'
      });

      const URL = `${config.FRONTEND_URL}/api/user/signUp/${verificationLink}`;
      const emailSent = await mailer(
        'Verification-Link',
        {
          email,
          URL,
        },
        config.SENDGRID_EMAIL_RECEIVER
      );
      if (!emailSent) throw Error('Error sending the email');
      return out(res, 201, 'User successfully created', userWithoutPassword);
    } catch (error) {
      return out(res, 500, error.message || error, null, 'SERVER_ERROR');
    }
  }
}
export default UserController;