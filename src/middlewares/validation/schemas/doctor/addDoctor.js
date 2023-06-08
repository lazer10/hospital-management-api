import Joi from 'joi';

export default Joi.object().keys({
  firstName: Joi.string().min(3).required(),
  lastName: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
  departments: Joi.array().items(Joi.string().pattern(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i)).required()
}).options({ allowUnknown: false });
