const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
  name: String,
  ingredients: String,
  preparation: String,
});

const Recipe = mongoose.model('recipe', recipeSchema);

async function createRecipe(data) {
  const recipe = new Recipe(data);
  return recipe.save();
}

module.exports = { createRecipe };
