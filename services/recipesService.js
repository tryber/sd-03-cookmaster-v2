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

module.exports = {
  createRecipeService,
};
