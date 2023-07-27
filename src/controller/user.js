import { Op } from 'sequelize';
import { generate, check } from '../helpers/bcrypt';
import UserService from '../database/services/user';
import out from '../helpers/response';
import { sign, verify } from '../helpers/jwt';
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

  static async userLogin(req, res) {
    try {
      const { email, userName, password } = req.body;

      if ((!!email && !!userName) || (!email && !userName)) {
        return out(res, 422, 'Please provide only Email or UserName ', null, 'VALIDATION_ERROR');
      }

      if (!password) {
        return out(res, 422, 'Please provide password ', null, 'VALIDATION_ERROR');
      }
      const userExist = await UserService.findUser(email ? { email } : { userName });
      let validPassword;
      if (userExist) {
        validPassword = await check(userExist.password, password);
      }

      if (!userExist || !validPassword) return out(res, 400, 'Invalid email/user name or password', null, 'BAD_REQUEST');

      const newtoken = sign({
        email: userExist.email,
        role: 'User',
        state: 'Logged in'
      });
      const data = {
        newtoken,
        email,
        role: 'User',
        logginTime: `${new Date().toLocaleDateString()}, ${new Date().toLocaleTimeString()}`
      };
      return out(res, 200, 'Login successful', data);
    } catch (error) {

  static async verifyUserAccount(req, res) {
    try {
      const { verificationToken } = req.params;

      const validUserVerificationToken = verify(verificationToken);
      if (!validUserVerificationToken || validUserVerificationToken.functionality !== 'signupVerificationLink') {
        return out(res, 403, 'You don\'t have access to do that action', null, 'FORBIDDEN');
      }

      const accountToVerify = { isVerified: true };
      await UserService.updateUser(accountToVerify, validUserVerificationToken.email);

      return out(res, 200, 'Account is verified');
    } catch (error) {
      if (error.name === 'JsonWebTokenError') {
        return out(res, 400, 'Invalid verification token', null, 'BAD_REQUEST');
      }

      return out(res, 500, error.message || error, null, 'SERVER_ERROR');
    }
  }
}

export default UserController;
