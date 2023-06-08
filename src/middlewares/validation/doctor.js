import validator from '../../helpers/validator';
import addDoctorSchema from './schemas/doctor/addDoctor';
import fetchDoctorSchema from './schemas/doctor/fetchDoctor';

// eslint-disable-next-line import/prefer-default-export
export const addDoctor = (req, res, next) => (
  validator(addDoctorSchema, req.body, res, next)
);

export const fetchDoctor = (req, res, next) => (
  validator(fetchDoctorSchema, req.body, res, next)
);
