const util = require('util');
const recipeModel = require('../models/recipesModel');
const userServices = require('./userServices');
const { RECIPE_NOT_FOUND, errMessage } = require('./errorsServices');

const verifyOwner = async (userId, recipeId) => {
  const recipe = await recipeModel.getRecipeById(recipeId);
  const user = await userServices.getUserById(userId);
  // if (user.role === 'user' && recipe.userId.toString() !== userId.toString()) return false;
  if (user.role === 'user' && !util.isDeepStrictEqual(recipe.userId, userId)) return false;
  return true;
};

const createRecipe = async (name, ingredients, preparation, userId) => {
  const createdRecipe = await recipeModel.createRecipe(name, ingredients, preparation, userId);
  const { _id } = createdRecipe;
  return { recipe: { name, ingredients, preparation, userId, _id } };
};

const listRecipes = async () => recipeModel.getAllRecipes();

const getRecipeById = async (id) => {
  const recipe = await recipeModel.getRecipeById(id);
  if (!recipe) return { err: true, message: errMessage(RECIPE_NOT_FOUND) };
  return recipe;
};

const updateRecipe = async (id, userId, newData) => {
  const { name, ingredients, preparation } = newData;

  if (!await verifyOwner(userId, id)) {
    return { err: true, message: errMessage('Usuário não autorizado') };
  }
  await recipeModel.updateRecipe(id, name, ingredients, preparation);
  return { _id: id, name, ingredients, preparation, userId };
};

const deleteRecipe = async (id, userId) => {
  if (!await verifyOwner(userId, id)) {
    return { err: true, message: errMessage('Usuário não autorizado') };
  }
  await recipeModel.deleteRecipe(id);
  return true;
};
module.exports = {
  createRecipe,
  listRecipes,
  getRecipeById,
  updateRecipe,
  deleteRecipe,
};
