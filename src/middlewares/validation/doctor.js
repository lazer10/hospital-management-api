import validator from '../../helpers/validator';
import addDoctorSchema from './schemas/doctor/addDoctor';
import updatePasswordSchema from './schemas/doctor/updateDefaultPassword';

// eslint-disable-next-line import/prefer-default-export
export const addDoctor = (req, res, next) => (
  validator(addDoctorSchema, req.body, res, next)
);

export const updateDefaultPassword = (req, res, next) => (
  validator(updatePasswordSchema, req.body, res, next)
);
