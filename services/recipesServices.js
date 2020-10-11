const { recipesModel } = require('../models');

const createRecipe = async (recipe) => {
  const createdRecipe = await recipesModel.createRecipe(recipe);

  return createdRecipe;
};

const getAllRecipes = async () => {
  const recipes = await recipesModel.getAllRecipes();

  return recipes;
};

const getRecipeById = async (id) => {
  const recipe = await recipesModel.getRecipeById(id);

  return recipe;
};

module.exports = {
  createRecipe,
  getAllRecipes,
  getRecipeById,
};
