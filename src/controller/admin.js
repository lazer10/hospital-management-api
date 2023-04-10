import config from '../config';
import out from '../helpers/response';

class Admin {
  static Adminlogin(req, res) {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        // return res.send(400, 'Please provide complete details');
        const data = {
          message: 'please provide complete details',
          error: 'VALIDATION_ERROR'
        };
        return out(res, 422, data);
      }
      // Compare entered email and password with the ones in .env file
      if (email !== config.ADMIN_EMAIL || password !== config.ADMIN_PASSWORD) {
        // Return a 200 response if they match
        return out(res, 401, 'invalid email or password');
      }
      const token = ({
        email: config.ADMIN_EMAIL,
        role: 'Admin'
      });
      const data = {
        token,
        email,
        role: 'Admin',
        logginTime: `${new Date().toLocaleDateString()}, ${new Date().toLocaleTimeString()}`
      };
      // Return a 201 response if they match
      return out(res, 201, 'Login successful', data);
    } catch (error) {
      return out(res, 500, 'internal server error');
    }
  }
}
export default Admin;
