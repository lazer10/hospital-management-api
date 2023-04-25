import validator from '../../helpers/validator';
import loginAdminSchema from './schemas/login/loginAdmin';

// eslint-disable-next-line import/prefer-default-export
export const loginAdmin = (req, res, next) => (
  validator(loginAdminSchema, req.body, res, next)
);
