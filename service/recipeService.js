const recipeModel = require('../model/recipeModel');
const { validateRecipe, messages, codes } = require('./error');

const newRecipe = async (name, ingredients, preparation, userId) => {
  //* Validações
  const valid = validateRecipe(name, ingredients, preparation);
  if (valid.code) return valid;

  //* Cadastramento da receita no mongoDB:
  const recipe = await recipeModel.newRecipe(name, ingredients, preparation, userId);
  return { recipe };
};

const getAllRecipes = async () => {
  const recipes = await recipeModel.getRecipes();
  return recipes;
};

const getRecipeWithId = async (id) => {
  const error = { code: codes[404], message: messages[6] };
  if (id.length < 5) return error;
  const recipe = await recipeModel.getRecipeById(id);
  return recipe;
};

module.exports = {
  newRecipe,
  getAllRecipes,
  getRecipeWithId,
};
