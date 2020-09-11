const userRoutes = require('./usersRoutes');
const recipesRoutes = require('./recipesRoutes');

module.exports = {
  newUser: userRoutes.createUser,
  login: userRoutes.userLogin,
  newRecipe: recipesRoutes.createRecipe,
};
