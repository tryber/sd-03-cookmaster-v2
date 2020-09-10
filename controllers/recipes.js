const express = require('express');
const rescue = require('express-rescue');
const Boom = require('boom');

const { recipesServices } = require('../services');
const { auth } = require('../middlewares');

const recipesRouter = express.Router();

const validateNewRecipe = (req, _res, next) => {
  const { user } = req;

  if (!user) return next(Boom.unauthorized('Invalid Token'));

  const { name, ingredients, preparation } = req.body;
  if (!name || !ingredients || !preparation) {
    return next(Boom.badRequest('Invalid entries. Try again.'));
  }

  next();
}

const createRecipe = rescue(async (req, res) => {
  const { user, body: { name, ingredients, preparation } = {} } = req;
  const recipe = await recipesServices.addRecipe(user._id, { name, ingredients, preparation });
  return res.status(201).json({ recipe });
});

const getAllRecipes = rescue(async (req, res) => {
  const recipes = await recipesServices.getRecipes();
  res.status(200).json(recipes);
});

const getRecipe = rescue(async (req, res, next) => {
  const { id } = req.params;

  if (id.length !== 24) return next(Boom.notFound('recipe not found'));

  const recipe = await recipesServices.getRecipeById(id);

  if (!recipe) return next(Boom.notFound('recipe not found'));

  return res.status(200).json(recipe);
})

recipesRouter.route('/')
  .post(auth, validateNewRecipe, createRecipe)
  .get(getAllRecipes);

recipesRouter.route('/:id')
  .get(getRecipe)

module.exports = recipesRouter;
