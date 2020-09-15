const rescue = require('express-rescue');
const { recipesServices } = require('../services');

const registerRecipes = rescue(async (req, res) => {
  const { name, ingredients, preparation } = req.body;
  const { _id: userId } = req.user;
  const newRecipe = await recipesServices.createRecipe(name, ingredients, preparation, userId);

  return res.status(201).json(newRecipe);
});

const listRecipes = rescue(async (req, res) => {
  const recipes = await recipesServices.listRecipes();
  return res.status(200).json(recipes);
});

const recipeById = rescue(async (req, res) => {
  const { id } = req.params;
  const recipe = await recipesServices.getRecipeById(id);
  if (recipe.err) return res.status(404).json(recipe.message);
  return res.status(200).json(recipe);
});

const updateRecipeById = rescue(async (req, res) => {
  const { id } = req.params;
  const { _id: userId } = req.user;
  const newData = req.body;
  const updatedRecipe = await recipesServices.updateRecipe(id, userId, newData);
  if (updatedRecipe.err) return res.status(401).json(updatedRecipe.message);

  return res.status(200).json(updatedRecipe);
});

const deleteRecipeById = rescue(async (req, res) => {
  const { id } = req.params;
  const { _id: userId } = req.user;
  await recipesServices.deleteRecipe(id, userId);

  return res.status(204).json({ message: 'deleted recipe' });
});

const updateRecipeImageById = rescue(async (req, res) => {
  const { id } = req.params;
  const { _id: userId } = req.user;
  const updatedRecipe = await recipesServices.updateRecipeImage(id, userId);

  return res.status(200).json(updatedRecipe);
});

module.exports = {
  registerRecipes,
  listRecipes,
  recipeById,
  updateRecipeById,
  deleteRecipeById,
  updateRecipeImageById,
};
