import Joi from 'joi';

export default Joi.object().keys({
  firstName: Joi.string().min(3).optional(),
  lastName: Joi.string().min(3).optional()
}).options({ allowUnknown: false });
