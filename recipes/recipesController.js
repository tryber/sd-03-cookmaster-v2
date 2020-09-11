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

const listRecipes = rescue(async (_req, res) => {
  const recipes = await recipesService.getAllRecipes();
  return res.status(200).json(recipes);
});

recipesRouter.post('/', validateJWT, newRecipe).get('/', listRecipes);

module.exports = recipesRouter;
