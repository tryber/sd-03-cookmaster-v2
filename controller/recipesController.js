const rescue = require('express-rescue');

const recipeService = require('../service/recipeService');

const newRecipe = rescue(async (req, res, next) => {
  const { name, ingredients, preparation } = req.body;
  const { _id } = req.user;

  const recipe = await recipeService.newRecipe(name, ingredients, preparation, _id);

  if (recipe.code) next(recipe);

  return res.status(201).json(recipe);
});

const getRecipes = rescue(async (_req, res, _next) => {
  const recipes = await recipeService.getAllRecipes();
  res.status(200).json(recipes);
});

const getRecipeById = rescue(async (req, res, next) => {
  const { id } = req.params;
  console.log('id passado na url', id);
  const recipe = await recipeService.getRecipeWithId(id);
  if (recipe.code) next(recipe);
  res.status(200).json(recipe);
});

const updateRecipe = rescue(async (req, res) => {
  const payload = req;
  const update = await recipeService.updateRecipe(payload);

  res.status(200).json(update);
});

const deleteRecipe = rescue(async (req, res) => {
  const { id } = req.params;

  await recipeService.deleteRecipeById(id);
  res.status(204).json();
});

module.exports = {
  newRecipe,
  getRecipes,
  getRecipeById,
  updateRecipe,
  deleteRecipe,
};
