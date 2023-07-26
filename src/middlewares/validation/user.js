import validator from '../../helpers/validator';
import userSignUpSchema from './schemas/user/userSignUp';

// eslint-disable-next-line import/prefer-default-export
export const userSignUp = (req, res, next) => (
  validator(userSignUpSchema, req.body, res, next)
);
