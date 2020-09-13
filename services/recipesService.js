const recipesModel = require('../models/recipesModel');
const userModel = require('../models/UserModel');

const createRecipeService = async (recipesData, email, tokenStatus) => {
  const { name, ingredients, preparation } = recipesData;
  if (tokenStatus === 'invalid_token') {
    return { code: 'invalid_token', message: 'Invalid entries. Try again.' };
  }
  const userInfo = await userModel.searchByEmail(email);
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
