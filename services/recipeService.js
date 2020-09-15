const { recipeModel } = require('../models');

const createRecipe = async (name, ingredients, preparation, user) => {
  if (!name || !ingredients || !preparation || !user) {
    return { code: 'invalid_data', message: 'Invalid entries. Try again.' };
  }

  const {
    _id: { id },
  } = user;

  const createdRecipe = await recipeModel.createRecipe(name, ingredients, preparation, id);

  return createdRecipe;
};

const getAllRecipes = async () => recipeModel.getAllRecipes();

const getRecipeById = async (id) => {
  if (id.length < 24) return { message: 'recipe not found' };

  const recipe = await recipeModel.getRecipeById(id);

  if (!recipe) return { message: 'recipe not found' };
  return recipe;
};

const editRecipe = async (id, name, ingredients, preparation, user) => {
  const { userId } = await recipeModel.getRecipeById(id);

  const editedRecipe = await recipeModel.editRecipe(id, name, ingredients, preparation, userId);

  return editedRecipe;
};

module.exports = { getAllRecipes, getRecipeById, createRecipe, editRecipe };
