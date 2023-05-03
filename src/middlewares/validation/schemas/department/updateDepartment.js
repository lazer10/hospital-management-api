import Joi from 'joi';

export default Joi.object().keys({
  name: Joi.string().min(3).regex(/^[a-zA-Z]{3,}$/).required()
}).options({ allowUnknown: false });
