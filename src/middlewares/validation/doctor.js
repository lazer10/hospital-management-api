import validator from '../../helpers/validator';
import addDoctorSchema from './schemas/doctor/addDoctor';

// eslint-disable-next-line import/prefer-default-export
export const addDoctor = (req, res, next) => (
  validator(addDoctorSchema, req.body, res, next)
);
