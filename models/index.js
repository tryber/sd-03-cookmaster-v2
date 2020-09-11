const user = require('./userModels');
const recipes = require('./recipesModels');

module.exports = {
  createUser: user.createUser,
  userByEmail: user.findUserByEmail,
  userById: user.findUserById,
  createRecipe: recipes.createRecipe,
};
