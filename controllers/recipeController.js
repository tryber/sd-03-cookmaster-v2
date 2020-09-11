const rescue = require('express-rescue');
const recipeService = require('../services/recipeService');
const recipeModel = require('../models/recipeModel');

const addRecipe = rescue(async (req, res) => {
  const { name, ingredients, preparation } = req.body;
  const { _id } = req.user;

  const newRecipe = await recipeService.add(name, ingredients, preparation, _id);

  if (newRecipe.status) {
    const { status, message } = newRecipe;
    return res.status(status).json({ message });
  }

  return res.status(201).json(newRecipe);
});

const listRecipes = rescue(async (_req, res) => {
  const recipes = await recipeModel.listAll();

  return res.status(200).json(recipes);
});

const listById = rescue(async (req, res) => {
  const recipe = await recipeService.findRecipe(req.params.id);

  if (recipe.status) {
    const { status, message } = recipe;
    return res.status(status).json({ message });
  }

  return res.status(200).json(recipe);
});

const update = rescue(async (req, res) => {
  const { name, ingredients, preparation } = req.body;
  const { _id, role } = req.user;
  const recipe = await recipeService
    .updateRecipe(_id, req.params.id, name, ingredients, preparation, role);

  if (recipe.status) {
    const { status, message } = recipe;
    return res.status(status).json({ message });
  }

  return res.status(200).json(recipe);
});

const removeRecipe = rescue(async (req, res) => {
  const { _id, role } = req.user;
  const recipe = await recipeService.remove(_id, req.params.id, role);

  if (recipe.status) {
    const { status, message } = recipe;
    return res.status(status).json({ message });
  }

  return res.status(204).send();
});

module.exports = {
  addRecipe,
  listRecipes,
  listById,
  update,
  removeRecipe,
}