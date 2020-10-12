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

const editRecipe = async (recipe) => {
  const { userId } = await recipesModel.getRecipeById(recipe.id);

  const updatedRecipe = await recipesModel.editRecipe({ ...recipe, userId });

  if (!updatedRecipe) {
    return;
  }

  return updatedRecipe;
};

module.exports = {
  editRecipe,
  createRecipe,
  getAllRecipes,
  getRecipeById,
};
