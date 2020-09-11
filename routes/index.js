const userRoutes = require('./usersRoutes');
const recipesRoutes = require('./recipesRoutes');

const { createUser, userLogin } = userRoutes;
const { createRecipe, updateRecipe, listRecipes, getRecipe } = recipesRoutes;

module.exports = {
  newUser: createUser,
  login: userLogin,
  newRecipe: createRecipe,
  modifyRecipe: updateRecipe,
  allRecipes: listRecipes,
  getRecipe,
};
