const { recipeModel } = require('../models');

const createNewRecipe = async (name, ingredients, preparation, user) => {
  if (!name || !ingredients || !preparation || !user) {
    return { code: 'invalid_data', message: 'Invalid entries. Try again.' };
  }

  const {
    _id: { id },
  } = user;
  const createdRecipe = await recipeModel.createNewRecipe(name, ingredients, preparation, id);
  return createdRecipe;
};

const getAll = async () => recipeModel.getAll();

const getRecipeById = async (id) => {
  if (id.length < 24) return { message: 'recipe not found' };

  const recipe = await recipeModel.findRecipeById(id);

  if (!recipe) return { message: 'recipe not found' };
  return recipe;
};

const editRecipe = async (id, name, ingredients, preparation) => {
  const { userId } = await recipeModel.findRecipeById(id);

  const editedRecipe = await recipeModel.editRecipe(id, name, ingredients, preparation, userId);

  return editedRecipe;
};

const deleteRecipe = async (id) => {
  await recipeModel.deleteRecipe(id);
};

module.exports = { getAll, getRecipeById, createNewRecipe, editRecipe, deleteRecipe };
