const { createRecipe, allRecipes } = require('../models');
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

const listRecipes = async () => {
  try {
    const recipesList = await allRecipes();

    return [...recipesList];
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = { create, listRecipes };
