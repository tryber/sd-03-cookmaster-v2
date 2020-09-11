const model = require('../model/model');
const userServices = require('./userServices');

const createNewRecipe = async (name, ingredients, preparation, userId) => {
  // regras de negócio
  const verify = userServices.entriesVerify(name, ingredients, preparation);
  if (verify) {
    return verify;
  }

  return model.createRecipe(name, ingredients, preparation, userId);
};

const getAllRecipes = async () => model.getAllRecipesFromDB();

module.exports = {
  createNewRecipe,
  getAllRecipes,
};
