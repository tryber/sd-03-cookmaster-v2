const { createRecipe } = require('../models');
const recipeValidation = require('./recipeRegisterValidation');

const create = async (name, ingredients, preparation, userId) => {
  try {
    const validation = recipeValidation(name, ingredients, preparation);

    const newRecipe = !validation.message
    && (await createRecipe(name, ingredients, preparation, userId));

    return validation.message ? { message: validation.message } : { ...newRecipe };
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = { create };
