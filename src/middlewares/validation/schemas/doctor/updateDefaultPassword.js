import Joi from 'joi';

export default Joi.object().keys({
  oldPassword: Joi.string().min(3).required(),
  newPassword: Joi.string()
    .min(8)
    .required()
    .regex(/^(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[a-zA-Z\d@$!%*?&]+$/)
    .message('Password must contain at least one lowercase letter, one digit, and one symbol')
}).options({ allowUnknown: false });
