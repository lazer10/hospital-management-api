import Joi from 'joi';

export default Joi.object().keys({
  email: Joi.string().min(8).required().email(),
  password: Joi.string().min(8).required()
}).options({ allowUnknown: false });
