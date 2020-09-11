const userServices = require('./userServices');
const recipesServices = require('./recipesServices');

const { create: CreateUser, getUser: SearchUser } = userServices;

const { create: CreateRecipe, listRecipes: ListAll, listRecipe: GetRecipe } = recipesServices;

module.exports = {
  CreateUser,
  SearchUser,
  CreateRecipe,
  ListAll,
  GetRecipe,
};
