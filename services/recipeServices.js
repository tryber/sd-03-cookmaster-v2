const model = require('../model/model');

const entriesVerify = (name, ingredients, preparation) => {
    let result;
    if (!name) {
      result = { message: 'Invalid entries. Try again.', status: 400 };
    }
    if (!ingredients) {
      result = { message: 'Invalid entries. Try again.', status: 400 };
    }
    if (!preparation) {
      result = { message: 'Invalid entries. Try again.', status: 400 };
    }
    return result;
  };

const createNewRecipe = async (name, ingredients, preparation, userId) => {
  let verify;
  // regras de negócio
  verify = entriesVerify(name, ingredients, preparation);

  if (verify) {
    return verify;
  }
  return model.createRecipe(name, ingredients, preparation, userId);
};

module.exports = {
  createNewRecipe,
};
