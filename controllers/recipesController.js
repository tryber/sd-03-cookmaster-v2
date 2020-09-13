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

const findRecipesById = async (req, res) => {
  const { id } = req.params;
  const recipe = await recipesService.findRecipesById(id);
  return res.status(200).json(recipe);
};

module.exports = {
  setNewRecipe,
  findAllRecipes,
  findRecipesById,
};
