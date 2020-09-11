const Recipes = require('../models/recipes');

async function createRecipe(data) {
  return Recipes.createRecipe(data);
}

async function getAllRecipes() {
  return Recipes.getAllRecipes();
}

async function getRecipe(data, field = 'id') {
  return Recipes.getRecipe(data, field);
}

async function updateRecipe(id, data) {
  return Recipes.updateRecipe(id, data);
}

async function deleteRecipe(id) {
  return Recipes.deleteRecipe(id);
}

async function addImagePath(id, path) {
  return Recipes.updateRecipe(id, { image: `localhost:3000/${path}` });
}

module.exports = { createRecipe,
  getAllRecipes,
  getRecipe,
  updateRecipe,
  deleteRecipe,
  addImagePath };
