const Recipes = require('../models/recipes');

async function createRecipe(data) {
  return Recipes.createRecipe(data);
}

async function getAllRecipes() {
  return Recipes.getAllRecipes();
}

module.exports = { createRecipe, getAllRecipes };
