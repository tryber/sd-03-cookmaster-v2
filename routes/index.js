const userRoutes = require('./usersRoutes');
const recipesRoutes = require('./recipesRoutes');

const { createUser, userLogin } = userRoutes;
const {
  createRecipe,
  updateRecipe,
  deleteRecipe,
  listRecipes,
  getRecipe,
  uploadRecipeImage,
} = recipesRoutes;

module.exports = {
  newUser: createUser,
  login: userLogin,
  newRecipe: createRecipe,
  modifyRecipe: updateRecipe,
  uploadImage: uploadRecipeImage,
  deleteRecipe,
  allRecipes: listRecipes,
  getRecipe,
};
