const { newRecipe, getAllRecipes, getRecipeById } = require('../models/recipesModel');

const insertNewRecipe = async (recipeObj) => {
  const recipe = await newRecipe(recipeObj);
  return recipe;
};

const getRecipes = async () => {
  const allRecipes = await getAllRecipes();
  return allRecipes;
};

const getRecipeWithId = async (id) => {
  const recipe = await getRecipeById(id);
  return recipe;
};

module.exports = {
  insertNewRecipe,
  getRecipes,
  getRecipeWithId,
};
