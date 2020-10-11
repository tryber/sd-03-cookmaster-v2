const { recipesModel } = require('../models');

const createRecipe = async (recipe) => {
  const createdRecipe = await recipesModel.createRecipe(recipe);

  return createdRecipe;
};

const getAllRecipes = async () => {
  const recipes = await recipesModel.getAllRecipes();

  return recipes;
};

module.exports = {
  createRecipe,
  getAllRecipes,
};
