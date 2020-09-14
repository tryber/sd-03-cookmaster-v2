const recipesModel = require('../models/recipesModel');
const userModel = require('../models/UserModel');

const checkInfo = async (recipesData, userData, token) => {
  const { name, ingredients, preparation } = recipesData;
  if (token.length < 170) {
    return { code: 'invalid_token', message: 'jwt malformed' };
  }
  if (name === undefined) {
    return { code: 'no_name', message: 'Invalid entries. Try again.' };
  }
  if (preparation === undefined) {
    return { code: 'no_name', message: 'Invalid entries. Try again.' };
  }
  if (ingredients === undefined) {
    return { code: 'no_name', message: 'Invalid entries. Try again.' };
  }
};

const createRecipeService = async (recipesData, userData, token) => {
  const { name, ingredients, preparation } = recipesData;
  const result = await checkInfo(recipesData, userData, token);
  if (result !== undefined) {
    return result;
  }
  const userInfo = await userModel.searchByEmail(userData.data);
  const { _id } = userInfo;
  const createRecipe = await recipesModel.createRecipeModel(name, ingredients, preparation, _id);
  return createRecipe;
};

const listRecipesService = async () => {
  const recipes = await recipesModel.listRecipesModel();
  return recipes;
};

const RecipeByIdService = async (id) => {
  let recipes;
  if (id.length === 24) {
    recipes = await recipesModel.RecipeByIdModel(id);
    return recipes;
  }
  if (recipes === undefined) {
    return { code: 'not_found', message: 'recipe not found' };
  }
};

const RecipeEditService = async (id, token, name, ingredients, preparation, userId) => {
  if (token === undefined) {
    return { code: 'not_logged', message: 'missing auth token' };
  }
  if (token.length < 160) {
    return { code: 'invalid_token', message: 'jwt malformed', length: token.length };
  }

  const recipes = await recipesModel.RecipeEditModel(id, name, ingredients, preparation, userId);
  return recipes;
};

module.exports = {
  createRecipeService,
  listRecipesService,
  RecipeByIdService,
  RecipeEditService,
};
