import Joi from 'joi';

export default Joi.object().keys({
  firstName: Joi.string().min(3).required(),
  lastName: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
  departments: Joi.array().items(Joi.string()).required()
}).options({ allowUnknown: false });
