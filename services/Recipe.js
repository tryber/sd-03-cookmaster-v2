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

module.exports = { createRecipe, getAllRecipes, getRecipe };
