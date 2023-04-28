import validator from '../../helpers/validator';
import addDepartmentSchema from './schemas/department/addDepartment copy';
import updateDepartmentSchema from './schemas/department/updateDepartment';

// eslint-disable-next-line import/prefer-default-export
export const addDepartment = (req, res, next) => (
  validator(addDepartmentSchema, req.body, res, next)
);
export const updateDepartment = (req, res, next) => (
  validator(updateDepartmentSchema, req.body, res, next)
);
