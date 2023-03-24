import output from './response';
import 'joi';

export default (schema, toValidate, res, next) => {
  const { error } = schema.validate(toValidate);
  return error ? output(res, 422, error.message, null, 'VALIDATION ERROR') : next();
};
