const { newRecipe, getAllRecipes } = require('../models/recipesModel');

const insertNewRecipe = async (recipeObj) => {
  const recipe = await newRecipe(recipeObj);
  return recipe;
};

const getRecipes = async () => {
  const allRecipes = await getAllRecipes();
  return allRecipes;
};

module.exports = {
  insertNewRecipe,
  getRecipes,
};
