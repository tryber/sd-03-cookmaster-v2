const { recipesModel } = require('../models');

const addRecipe = async (data) => {
  const { name, ingredients, preparation, userId } = data;
  const createdRecipe = await recipesModel.createRecipe(name, ingredients, preparation, userId);
  return createdRecipe;
};

const listAllRecipes = async () => {
  const recipesList = await recipesModel.getAllRecipes();
  return recipesList;
};

const getRecipeById = async (id) => {
  if (id.length !== 24) return { error: { message: 'recipe not found' } };

  const recipe = await recipesModel.getRecipeById(id);

  if (recipe === null) return { error: { message: 'recipe not found' } };

  return recipe;
};

const updateRecipe = async (id, userId, name, ingredients, preparation) => {
  const recipe = await recipesModel.updateRecipe(id, userId, name, ingredients, preparation);
  return recipe;
};

module.exports = {
  addRecipe,
  listAllRecipes,
  getRecipeById,
  updateRecipe,
};
