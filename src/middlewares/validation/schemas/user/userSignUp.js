import Joi from 'joi';

export default Joi.object().keys({
  firstName: Joi.string().min(3).required(),
  lastName: Joi.string().min(3).optional(),
  email: Joi.string().email().required(),
  userName: Joi.string().min(3).required(),
  password: Joi.string()
  .min(8)
  .required()
  .regex(/^(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[a-zA-Z\d@$!%*?&]+$/)
  .message('Password must contain at least one lowercase letter, one digit, and one symbol'),
  phone_number: Joi.string().min(10).required()
}).options({ allowUnknown: false });
