const { Router } = require('express');
const rescue = require('express-rescue');
const Boom = require('@hapi/boom');
const validateJWT = require('../middlewares/validateJWT');
const recipesService = require('./recipesService');
const schemas = require('./schemas');

const recipesRouter = Router();

const newRecipe = rescue(async (req, res, next) => {
  const { name, ingredients, preparation } = req.body;
  const { error } = schemas.recipeSchema.validate({ name, ingredients, preparation });
  if (error) return next(Boom.badRequest('Invalid entries. Try again.', 'invalid_data'));
  const recipe = await recipesService.addRecipe(name, ingredients, preparation);

  res.status(201).json({ recipe });
});

recipesRouter.post('/', validateJWT, newRecipe);

module.exports = recipesRouter;
