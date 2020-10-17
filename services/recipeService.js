const { ObjectId } = require('mongodb');
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

const getAllRecipes = async () => recipeModel.getAllRecipes();

const getRecipeById = async (id) => {
  console.log(id);
  if (!ObjectId.isValid(id)) return { error: true, status: 404, message: 'recipe not found' };
  const recipe = await recipeModel.getRecipeById(id);
  if (!recipe) return { error: true, status: 404, message: 'recipe not found' };
  return recipe;
};

const updateRecipe = async (id, { name, ingredients, preparation }) => {
  const recipe = await recipeModel.getRecipeById(id);
  if (recipe.error) return recipe;
  const validation = await validateRecipeData(name, ingredients, preparation);
  if (validation.error) return validation;
  return recipeModel.updateRecipe(id, { name, ingredients, preparation });
}; // FALTA VALIDAR SE O USUÁRIO ESTÁ LOGADO OU É ADMIN

module.exports = {
  createRecipe,
  getAllRecipes,
  getRecipeById,
  updateRecipe,
};
