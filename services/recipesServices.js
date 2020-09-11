const recipeModel = require('../models/recipesModel');
const { RECIPE_NOT_FOUND, errMessage } = require('./errorsServices');

const createRecipe = async (name, ingredients, preparation, userId) => {
  const createdRecipe = await recipeModel.createRecipe(name, ingredients, preparation, userId);
  const { _id } = createdRecipe;
  return { recipe: { name, ingredients, preparation, userId, _id } };
};

const listRecipes = async () => recipeModel.getAllRecipes();

const getRecipeById = async (id) => {
  const recipe = await recipeModel.getRecipeById(id);
  if (!recipe) return { err: true, message: errMessage(RECIPE_NOT_FOUND) };
  return recipe;
};

module.exports = {
  createRecipe,
  listRecipes,
  getRecipeById,
};
