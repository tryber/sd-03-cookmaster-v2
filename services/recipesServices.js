const util = require('util');
const recipeModel = require('../models/recipesModel');
const userServices = require('./userServices');
const { RECIPE_NOT_FOUND, errMessage } = require('./errorsServices');

const verifyOwner = async (userId, recipeId) => {
  const recipe = await recipeModel.getRecipeById(recipeId);
  const user = await userServices.getUserById(userId);

  if (!user) return false;
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

const updateRecipeImage = async (id, userIdAuth) => {
  const { _id, name, ingredients, preparation, userId } = await recipeModel.getRecipeById(id);
  if (!await verifyOwner(userIdAuth, id)) {
    return { err: true, message: errMessage('Usuário não autorizado') };
  }
  const recipePath = await recipeModel.updateRecipeImage(id, 'localhost:3000/images/');
  return { _id, name, ingredients, preparation, userId, image: recipePath };
};

module.exports = {
  createRecipe,
  listRecipes,
  getRecipeById,
  updateRecipe,
  deleteRecipe,
  updateRecipeImage,
};
