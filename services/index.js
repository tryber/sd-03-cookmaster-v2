const userServices = require('./userServices');
const recipesServices = require('./recipesServices');

const {
  create: CreateUser,
  getUserByEmail: SearchByEmail,
  getUserById: SearchUserByID,
} = userServices;

const { create: CreateRecipe } = recipesServices;

module.exports = {
  CreateUser,
  SearchByEmail,
  SearchUserByID,
  CreateRecipe,
};
