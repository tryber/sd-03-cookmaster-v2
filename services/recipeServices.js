const model = require('../model/model');
const userServices = require('./userServices');

const createNewRecipe = async (name, ingredients, preparation, userId) => {
  let verify;
  // regras de negócio
  verify = userServices.entriesVerify(name, ingredients, preparation);
  if (verify) {
    return verify;
  }

  return model.createRecipe(name, ingredients, preparation, userId);
};

module.exports = {
  createNewRecipe,
};
