const { recipeModel } = require('../models');

const createNewRecipe = async (name, ingredients, preparation, user) => {
  if (!name || !ingredients || !preparation || !user) {
    return { code: 'invalid_data', message: 'Invalid entries. Try again.' };
  }

  const createdRecipe = await recipeModel.createNewRecipe(name, ingredients, preparation, user._id);

  return createdRecipe;
};

module.exports = { createNewRecipe };
