const user = require('./userModels');
const recipes = require('./recipesModels');

const { createUser, findUserByEmail, findUserById } = user;
const { createRecipe, updateRecipe, getAllRecipes, getRecipeById } = recipes;

module.exports = {
  createUser,
  userByEmail: findUserByEmail,
  userById: findUserById,
  createRecipe,
  updateRecipe,
  allRecipes: getAllRecipes,
  recipeById: getRecipeById,
};
