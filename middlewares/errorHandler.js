const Joi = require('joi');
const Boom = require('@hapi/boom');
const recipesService = require('../recipes/recipesService');

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
  id: Joi
    .string()
    .hex()
    .min(24)
    .max(24)
    .required(),
});

const verifyId = (req, _res, next) => {
  const { id } = req.params;
  const { error } = idSchema.validate({ id });
  if (error) {
    return next(Boom.notFound('recipe not found', 'invalid_id'));
  }
  return next();
};

const verifyUserRecipePermission = async (req, _res, next) => {
  const { id } = req.params;
  const recipe = await recipesService.getRecipeById(id);
  const { _id, role } = req.user;
  if (role !== 'admin' && recipe.userId.toString() !== _id.toString()) {
    return next(Boom.unauthorized('jwt malformed', 'unauthorized'));
  }
  return next();
};

const verifyIsAdmin = async (req, _res, next) => {
  const { role } = req.user;
  if (role !== 'admin') {
    return next(Boom.forbidden('Only admins can register new admins', 'unauthorized'));
  }
  return next();
};

module.exports = { errorHandler, verifyId, verifyUserRecipePermission, verifyIsAdmin };
