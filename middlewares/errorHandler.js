const Joi = require('joi');
const Boom = require('@hapi/boom');

const errorHandler = (error, _req, res, _next) => {
  if (error.isBoom) {
    let code = 'invalid_data';
    if (typeof error.data === 'string') code = error.data;
    return res.status(error.output.statusCode).json({
      code,
      message: error.output.payload.message,
    });
  }
  if (error.code === 11000) {
    return res.status(409).json({ code: 'invalid_data', message: 'Email already registered' });
  }
  res.status(500).json({ message: error.message, stack: error.stack });
};

const idSchema = Joi.object({
  id: Joi.string().hex().min(24).max(24).required(),
});

const verifyId = (req, _res, next) => {
  const { id } = req.params;
  const { error } = idSchema.validate({ id });
  if (error) {
    return next(Boom.notFound('recipe not found', 'invalid_id'));
  }
  return next();
};

module.exports = { errorHandler, verifyId };
