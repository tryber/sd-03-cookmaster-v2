const recipeModel = require('../models/recipeModel');

const validateRecipeData = async (name, ingredients, preparation) => {
  if (!name || !ingredients || !preparation) return { error: true, status: 400, message: 'Invalid entries. Try again.' };
  return { error: false };
};

const createRecipe = async (name, ingredients, preparation, userId) => {
  const validation = await validateRecipeData(name, ingredients, preparation);
  if (validation.error) return validation;
  const recipe = await recipeModel.createRecipe(name, ingredients, preparation, userId);
  return recipe;
};

const getAllRecipes = async () => ({ recipes: await recipeModel.getAllRecipes() });

module.exports = {
  createRecipe,
  getAllRecipes,
};
