const Recipes = require('../models/recipes');

async function createRecipe(data) {
  return Recipes.createRecipe(data);
}

module.exports = { createRecipe };
