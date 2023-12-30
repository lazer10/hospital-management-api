import Joi from 'joi';

export default Joi.object().keys({
  firstName: Joi.string().min(3).required(),
  lastName: Joi.string().min(3).optional(),
  email: Joi.string().email().required(),
  userName: Joi.string().min(3).required(),
}).options({ allowUnknown: false });
