const user = require('./LoginModel');
const recipes = require('./RecipeModel');

const {
  getUserByEmail,
  getUserById,
  registerUser,
} = user;

const {
  create,
  getAll,
  getById,
  edit,
  deleteIt,
  addImage,
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
