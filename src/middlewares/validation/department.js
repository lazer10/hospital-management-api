import validator from '../../helpers/validator';
import addDepartmentSchema from './schemas/department/addDepartment';

// eslint-disable-next-line import/prefer-default-export
export const addDepartment = (req, res, next) => (
  validator(addDepartmentSchema, req.body, res, next)
);
