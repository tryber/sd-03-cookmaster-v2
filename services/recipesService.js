const recipesModel = require('../models/recipesModel');
const userModel = require('../models/UserModel');

const createRecipeService = async (recipesData, userData, token) => {
  const { name, ingredients, preparation } = recipesData;
  if (token.length < 170) {
    return { code: 'invalid_token', message: 'jwt malformed' };
  }
  const userInfo = await userModel.searchByEmail(userData.data);
  if (name === undefined) {
    return { code: 'no_name', message: 'Invalid entries. Try again.' };
  }
  if (preparation === undefined) {
    return { code: 'no_name', message: 'Invalid entries. Try again.' };
  }
  if (ingredients === undefined) {
    return { code: 'no_name', message: 'Invalid entries. Try again.' };
  }
  const result = await recipesModel.createRecipeModel(name, ingredients, preparation, userInfo._id);
  return result;
};

module.exports = {
  createRecipeService,
};
