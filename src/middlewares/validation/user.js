import validator from '../../helpers/validator';
import userSignUpSchema from './schemas/user/userSignUp';

export const userSignUp = (req, res, next) => (
  validator(userSignUpSchema, req.body, res, next)
);
