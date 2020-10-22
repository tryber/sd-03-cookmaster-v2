const express = require('express');
const rescue = require('express-rescue');

const { recipesServices } = require('../services');
const { auth } = require('../middlewares');

const RecipesRouter = express.Router();

const CheckNewRecipe = (req, res, next) => {
  const { user } = req;

  if (!user) res.status(401).json({ message: 'Invalid Token' });

  const { name, ingredients, preparation } = req.body;
  if (!name || !ingredients || !preparation) {
    return res.status(400).json({ message: 'Invalid entries. Try again.' });
  }

  next();
};

const createRecipe = rescue(async (req, res) => {
  const {
    user: { _id: id },
    body: { name, ingredients, preparation } = {},
  } = req;
  const recipe = await recipesServices.addRecipe(id, { name, ingredients, preparation });
  return res.status(201).json({ recipe });
});

const getAllRecipes = rescue(async (req, res) => {
  const recipes = await recipesServices.getAllRecipes();
  res.status(200).json(recipes);
});

const getRecipeById = rescue(async (req, res) => {
  const { id } = req.params;

  // Error: Argument passed in must be a single String of 12 bytes or a string of 24 hex characters
  if (id.length !== 24) return res.status(404).json({ message: 'recipe not found' });

  const recipe = await recipesServices.getRecipeById(id);

  if (!recipe) return res.status(404).json({ message: 'recipe not found' });

  return res.status(200).json(recipe);
});

const CheckRole = rescue(async (req, res, next) => {
  const {
    params: { id },
    user: { _id: userId, role },
  } = req || {};

  if (role === 'admin') {
    req.permission = true;
    return next();
  }

  const permission = await recipesServices.checkUserOwner(userId, id);

  if (permission.error) return res.statu(401).json({ message: 'mensagem' });

  res.permission = permission;

  next();
});

const UpdateRecipe = rescue(async (req, res) => {
  const {
    params: { id },
    body: { name, ingredients, preparation },
  } = req || {};

  const updated = await recipesServices.updateRecipe(id, name, ingredients, preparation);

  res.status(200).json(updated);
});

const DeleteRecipe = rescue(async (req, res) =>
  recipesServices.deleteRecipe(req.params.id).then(() => res.status(204).end()));

RecipesRouter.route('/')
  .post(auth, CheckNewRecipe, createRecipe)
  .get(getAllRecipes);

RecipesRouter.route('/:id')
  .get(getRecipeById)
  .put(auth, CheckRole, CheckNewRecipe, UpdateRecipe)
  .delete(auth, CheckRole, DeleteRecipe);

module.exports = RecipesRouter;
