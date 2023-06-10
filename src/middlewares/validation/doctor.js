import validator from '../../helpers/validator';
import addDoctorSchema from './schemas/doctor/addDoctor';
import fetchDoctorSchema from './schemas/doctor/doctorLogin';

export const addDoctor = (req, res, next) => (
  validator(addDoctorSchema, req.body, res, next)
);

export const doctorLogin = (req, res, next) => (
  validator(fetchDoctorSchema, req.body, res, next)
);
