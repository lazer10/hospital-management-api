import UserService from '../database/services/user';
import out from '../helpers/response';
import { verify } from '../helpers/jwt';


class UserController {
    static async verifyUserAccount(req, res) {
        try {
          const { verificationToken } = req.params;
      
          const validUserVerificationLink = verify(verificationToken);
          
          if (!validUserVerificationLink || validUserVerificationLink.functionality !== 'signupVerificationLink') {
            return out(res, 403, "You don't have access to do that action", null, 'FORBIDDEN');
          }

          const accountToVerify = { isVerified: true };
          await UserService.updateUser(accountToVerify, validUserVerificationLink.email);
      
          return out(res, 200, 'Account is verified');
        } catch (error) {
          return out(res, 500, error.message || error, null, 'SERVER_ERROR');
        }
      }
      
}

export default UserController;