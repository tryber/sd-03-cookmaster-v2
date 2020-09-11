const {
  newRecipe,
  getAllRecipes,
  getRecipeById,
  updateRecipe,
} = require('../models/recipesModel');

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

const updateRecipeById = async (id, newData) => {
  const updatedRecipe = await updateRecipe(id, newData);
  return updatedRecipe;
};

module.exports = {
  insertNewRecipe,
  getRecipes,
  getRecipeWithId,
  updateRecipeById,
};
