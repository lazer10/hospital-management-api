import validator from '../../helpers/validator';
import addDoctorSchema from './schemas/doctor/addDoctor';
import updatePasswordSchema from './schemas/doctor/updateDefaultPassword';
import doctorEditProfileSchema from './schemas/doctor/doctorEditTheirProfile';

// eslint-disable-next-line import/prefer-default-export
export const addDoctor = (req, res, next) => (
  validator(addDoctorSchema, req.body, res, next)
);

export const updateDefaultPassword = (req, res, next) => (
  validator(updatePasswordSchema, req.body, res, next)
);

export const doctorEditTheirProfile = (req, res, next) => (
  validator(doctorEditProfileSchema, req.body, res, next)
);
