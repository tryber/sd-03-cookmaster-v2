const recipeModel = require('../models/recipeModel');

const addRecipe = async ({ name, ingredients, preparation, userId }) => {
  if (!name || !ingredients || !preparation) {
    return ({ error: true, message: 'Invalid entries. Try again.' });
  }

  const recipe = await recipeModel.add({ name, ingredients, preparation, userId });
  return recipe;
};

const getAllRecipes = async () => {
  const recipes = await recipeModel.getAll();
  return recipes;
};

module.exports = {
  addRecipe,
  getAllRecipes,
};
