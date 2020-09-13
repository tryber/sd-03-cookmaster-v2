const {
  newRecipe,
  getAllRecipes,
  getRecipeById,
  updateRecipe,
  deleteRecipe,
  updateRecipeImage,
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

const deleteRecipeById = async (id) => {
  const recipe = await deleteRecipe(id);
  return recipe;
};

const updateRecipeIMG = async (id, path) => {
  const recipe = await updateRecipeImage(id, path);
  return recipe;
};

module.exports = {
  insertNewRecipe,
  getRecipes,
  getRecipeWithId,
  updateRecipeById,
  deleteRecipeById,
  updateRecipeIMG,
};
