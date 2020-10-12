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

const deleteRecipe = async ({ recipeId, idLoged }) => {
  const { userId: recipeCreator } = await recipesModel.getRecipeById(recipeId);

  if (idLoged !== recipeCreator) {
    return;
  }

  const deletedRecipe = await recipesModel.deleteRecipe(recipeId);

  return deletedRecipe;
};

module.exports = {
  editRecipe,
  createRecipe,
  deleteRecipe,
  getAllRecipes,
  getRecipeById,
};
