const recipeModel = require('../models/recipeModel');

const createNewRecipe = async (name, ingredients, preparation, user) => {
  if (!name || !ingredients || !preparation || !user) {
    return { code: 'invalid_data', message: 'Invalid entries. Try again.' };
  }

  const createdRecipe = await recipeModel.createNewRecipe(name, ingredients, preparation, user._id);
  return createdRecipe;
};

const getAll = async () => recipeModel.getAll();

const getRecipeById = async (id) => {
  if (id.length < 24) return { message: 'recipe not found' };

  const recipe = await recipeModel.findRecipeById(id);

  if (!recipe) return { message: 'recipe not found' };
  return recipe;
};

const editRecipe = async (id, name, ingredients, preparation, user) => {
  const { userId } = await recipeModel.findRecipeById(id);

  if (userId !== user._id && user.role === 'user') return { message: 'user not authorized' };

  const editRecipe = await recipeModel.editRecipe(id, name, ingredients, preparation, userId);
  return editRecipe;
};

module.exports = { getAll, getRecipeById, createNewRecipe, editRecipe };
