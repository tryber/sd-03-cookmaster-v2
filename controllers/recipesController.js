const recipesService = require('../services/recipes');

const setNewRecipe = async (req, res, next) => {
  const { name, ingredients, preparation } = req.recipe;
  const { userId } = req;
  const recipe = await recipesService.setNewRecipe(name, ingredients, preparation, userId);
  if (recipe.error) return next(recipe);
  return res.status(201).json(recipe);
};

const findAllRecipes = async (_req, res) => {
  const recipe = await recipesService.findAllRecipes();
  return res.status(200).json(recipe);
};

const findRecipesById = async (req, res, next) => {
  const { id } = req.params;
  const recipe = await recipesService.findRecipesById(id);
  if (recipe.error) return next(recipe);
  return res.status(200).json(recipe);
};

const editRecipe = async (req, res, next) => {
  const { id } = req.params;
  const { name, ingredients, preparation } = req.recipe;
  const { _id: userId, role } = req.user;
  const recipe = await recipesService.editRecipe(id, name, ingredients, preparation, userId, role);
  if (recipe.error) return next(recipe);
  return res.status(200).json(recipe);
};

const deleteRecipe = async (req, res, next) => {
  const { id } = req.params;
  const { _id: userId, role } = req.user;
  const recipe = await recipesService.deleteRecipe(id, userId, role);
  if (recipe.error) return next(recipe);
  return res.status(201).json();
};

module.exports = {
  setNewRecipe,
  findAllRecipes,
  findRecipesById,
  editRecipe,
  deleteRecipe,
};
