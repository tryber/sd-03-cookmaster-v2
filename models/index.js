const user = require('./LoginModel');
const recipes = require('./RecipeModel');

const { 
  getUserByEmail,
  getUserById,
  registerUser,
} = user;

const {
  createRecipe,
  getAllRecipes,
  getRecipeById,
  editRecipe,
  deleteRecipe,
  addImageToRecipe,
} = recipes;

module.exports = {
  registerUser,
  getUserByEmail,
  getUserById,
  createRecipe,
  editRecipe,
  addImageToRecipe,
  deleteRecipe,
  getAllRecipes,
  getRecipeById,
};
