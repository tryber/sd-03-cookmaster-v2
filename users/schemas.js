const Joi = require('joi');

const userSchema = Joi.object({
  name: Joi.string().required(),

  password: Joi.string().required(),

  email: Joi.string().email().required(),
});

module.exports = { userSchema };
