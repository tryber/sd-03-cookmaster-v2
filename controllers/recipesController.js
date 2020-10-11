const boom = require('@hapi/boom');
const { recipesService } = require('../services');

const createRecipe = async (req, res) => {
  const { name, ingredients, preparation } = req.recipe;
  const { _id: userId } = req.user;

  const recipeData = await recipesService.createRecipe({ name, ingredients, preparation, userId });

  res.status(201).json(recipeData);
};

const getAllRecipes = async (_req, res) => {
  const recipes = await recipesService.getAllRecipes();

  res.status(200).json(recipes);
};

const getRecipeById = async (req, res, next) => {
  const { id } = req.params;

  const recipe = await recipesService.getRecipeById(id);

  if (!recipe) {
    return next(boom.notFound('recipe not found'));
  }

  res.status(200).json(recipe);
};

module.exports = {
  createRecipe,
  getAllRecipes,
  getRecipeById,
};
