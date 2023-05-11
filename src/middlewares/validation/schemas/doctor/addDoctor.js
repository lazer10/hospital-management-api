import Joi from 'joi';

export default Joi.object().keys({
  firstName: Joi.string().min(3).required(),
  lastName: Joi.string().min(3).required(),
  email: Joi.string().email().required().min(8),
  departments: Joi.string().min(1).required()

}).options({ allowUnknown: false });
