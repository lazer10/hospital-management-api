import out from '../helpers/response';
import config from '../config';
import { sign } from '../helpers/jwt';

class AdminController {
  static loginAdmin(req, res) {
    try {
      if (!req.body.email || !req.body.password) {
        return out(res, 422, 'Please provide complete details', null, 'VALIDATION_ERROR');
      }
      const { email, password } = req.body;

      // Compare entered email and password with the ones in .env file
      if (email === config.ADMIN_EMAIL && password === config.ADMIN_PASSWORD) {
        // Return a 200 response if they match
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
        return out(res, 200, 'Login successful', data);
      }
      // Return a 401 response if they don't match
      return res.status(401).json({ message: 'Invalid email or password.' });
    } catch (error) {
      return res.send(404, error.message);
    }
  }
}

export default AdminController;
