import config from '../config';
import out from '../helpers/response';
import { sign } from '../helpers/jwt';

class AdminController {
  static adminLogin(req, res) {
    try {
      const { email, password } = req.body;
      // if (!email || !password) {
      //   return out(res, 422, 'Please provide complete details', null, 'VALIDATION_ERROR');
      // }
      if (email !== config.ADMIN_EMAIL || password !== config.ADMIN_PASSWORD) {
        return out(res, 400, 'Invalid email or password', null, 'BAD_REQUEST');
      }
      const token = sign({
        email: config.ADMIN_EMAIL,
        role: 'Admin'
      });
      const data = {
        token,
        email,
        role: 'Admin',
        logginTime: `${new Date().toLocaleDateString()}, ${new Date().toLocaleTimeString()}`
      };
      return out(res, 200, 'Login successful', data, null);
    } catch (error) {
      return out(res, 500, error.message || error, null, 'SERVER_ERROR');
    }
  }
}
export default AdminController;
