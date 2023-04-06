const dotenv = require('dotenv');

dotenv.config();

class adminController {
  static loginAdmin(req, res) {
    try {
      if (!req.body.email || !req.body.password) {
        return res.send(400, 'Please provide complete details');
      }
      const { email, password } = req.body;

      // Compare entered email and password with the ones in .env file
      if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
        // Return a 200 response if they match
        return res.status(200).json({ message: 'Login successful!' });
      }
      // Return a 401 response if they don't match
      return res.status(401).json({ message: 'Invalid email or password.' });
    } catch (error) {
      return res.send(404, error.message);
    }
  }
}

module.exports = adminController;
