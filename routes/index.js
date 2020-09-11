const userRoutes = require('./usersRoutes');
const recipesRoutes = require('./recipesRoutes');

const { createUser, userLogin } = userRoutes;
const { createRecipe, listRecipes, getRecipe } = recipesRoutes;

module.exports = {
  newUser: createUser,
  login: userLogin,
  newRecipe: createRecipe,
  allRecipes: listRecipes,
  getRecipe,
};
