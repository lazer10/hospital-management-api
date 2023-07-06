import validator from '../../helpers/validator';
import addDoctorSchema from './schemas/doctor/addDoctor';
import updatePasswordSchema from './schemas/doctor/updateDefaultPassword';
import doctorForgotPasswordSchema from './schemas/doctor/doctorForgotPassword';
import doctorResetPasswordSchema from './schemas/doctor/doctorResetPassword';

// eslint-disable-next-line import/prefer-default-export
export const addDoctor = (req, res, next) => (
  validator(addDoctorSchema, req.body, res, next)
);

export const updateDefaultPassword = (req, res, next) => (
  validator(updatePasswordSchema, req.body, res, next)
);

export const doctorForgotPassword = (req, res, next) => (
  validator(doctorForgotPasswordSchema, req.body, res, next)
);

export const doctorResetpassword = (req, res, next) => (
  validator(doctorResetPasswordSchema, req.body, res, next)
);
