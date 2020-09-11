const { newRecipe } = require('../models/recipesModel');

const insertNewRecipe = async (recipeObj) => {
  const recipe = await newRecipe(recipeObj);
  return recipe;
};

module.exports = {
  insertNewRecipe,
};
