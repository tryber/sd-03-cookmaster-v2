const { ObjectId } = require('mongodb');
const recipeModel = require('../models/recipeModel');
const userService = require('./userService');

const validateRecipeData = async (name, ingredients, preparation) => {
  if (!name || !ingredients || !preparation) return { error: true, status: 400, message: 'Invalid entries. Try again.' };
  return { error: false };
};

const createRecipe = async (name, ingredients, preparation, userId) => {
  const validation = await validateRecipeData(name, ingredients, preparation);
  if (validation.error) return validation;
  const recipe = await recipeModel.createRecipe(name, ingredients, preparation, userId);
  return recipe;
};

const getAllRecipes = async () => recipeModel.getAllRecipes();

const getRecipeById = async (id) => {
  if (!ObjectId.isValid(id)) return { error: true, status: 404, message: 'recipe not found' };
  const recipe = await recipeModel.getRecipeById(id);
  if (!recipe) return { error: true, status: 404, message: 'recipe not found' };
  return recipe;
};

const updateRecipe = async (id, { name, ingredients, preparation, userId }) => {
  const recipe = await recipeModel.getRecipeById(id);
  const user = await userService.userIsAdmin(userId);
  const validation = await validateRecipeData(name, ingredients, preparation);
  const updatedRecipe = await recipeModel.updateRecipe(
    id,
    { name, ingredients, preparation, userId },
  );

  switch (true) {
    case (!recipe):
      return { error: true, status: 404, message: 'recipe not found' };
    case (recipe.error):
      return recipe;
    case (user === false && recipe.userId.toString() !== userId.toString()):
      return recipe;
    case (validation.error):
      return validation;
    default:
      return updatedRecipe;
  }
};

const deleteRecipe = async (id, userId) => {
  const recipe = await recipeModel.getRecipeById(id);
  const user = await userService.userIsAdmin(userId);

  switch (true) {
    case (!recipe):
      return { error: true, status: 404, message: 'recipe not found' };
    case (recipe.error):
      return recipe;
    case (user === false && recipe.userId.toString() !== userId.toString()):
      return recipe;
    default:
      return recipeModel.deleteRecipe(id);
  }
};

module.exports = {
  createRecipe,
  getAllRecipes,
  getRecipeById,
  updateRecipe,
  deleteRecipe,
};
