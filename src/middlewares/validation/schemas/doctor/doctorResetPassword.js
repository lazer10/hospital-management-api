import Joi from 'joi';

export default Joi.object().keys({
  newPassword: Joi.string()
    .min(8)
    .required()
    .regex(/^(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[a-zA-Z\d@$!%*?&]+$/)
    .message('Password must contain at least one lowercase letter, one digit, and one symbol'),
  confirmPassword: Joi.string()
    .min(8)
    .required()
    .valid(Joi.ref('newPassword'))
    .regex(/^(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[a-zA-Z\d@$!%*?&]+$/)
    .message('Password must contain at least one lowercase letter, one digit, and one symbol')
}).options({ allowUnknown: false });
