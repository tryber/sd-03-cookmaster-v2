const checkLogin = require('./checkLogin');
const createRecipe = require('./createRecipe');
const getRecipes = require('./getRecipes');
const getRecipeById = require('./getRecipeById');
const validateOwner = require('./validateOwner');
const updateRecipe = require('./updateRecipe');
const putImageOnRecipe = require('./putImageOnRecipe');
const deleteRecipe = require('./deleteRecipe');

module.exports = {
  checkLogin,
  createRecipe,
  getRecipes,
  getRecipeById,
  validateOwner,
  updateRecipe,
  putImageOnRecipe,
  deleteRecipe,
};
