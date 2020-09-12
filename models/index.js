const user = require('./userModels');
const recipes = require('./recipesModels');

const { createUser, findUserByEmail, findUserById } = user;
const {
  createRecipe,
  updateRecipe,
  updateRecipeImage,
  getAllRecipes,
  getRecipeById,
  deleteRecipe,
} = recipes;

module.exports = {
  createUser,
  userByEmail: findUserByEmail,
  userById: findUserById,
  createRecipe,
  updateRecipe,
  uploadImage: updateRecipeImage,
  deleteRecipe,
  allRecipes: getAllRecipes,
  recipeById: getRecipeById,
};
