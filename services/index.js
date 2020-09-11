const userServices = require('./userServices');
const recipesServices = require('./recipesServices');

const { create: CreateUser, getUser: SearchUser } = userServices;

const { create: CreateRecipe } = recipesServices;

module.exports = {
  CreateUser,
  SearchUser,
  CreateRecipe,
};
