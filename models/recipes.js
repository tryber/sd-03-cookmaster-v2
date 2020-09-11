const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
  name: String,
  ingredients: String,
  preparation: String,
  image: String,
});

const Recipe = mongoose.model('recipe', recipeSchema);

async function createRecipe(data) {
  const recipe = new Recipe(data);
  return recipe.save();
}

async function getAllRecipes() {
  return Recipe.find();
}

async function getRecipe(data, field = 'id') {
  if (field === 'id') {
    const recipe = Recipe.findById(data);
    return recipe;
  }
  return Recipe.findOne({ [field]: data }).exec();
}
async function updateRecipe(id, data) {
  console.log('data', data);
  const updated = await Recipe.findByIdAndUpdate(id, data, { new: true }).exec();
  console.log('up', updated);
  return updated;
}
async function deleteRecipe(id) {
  return Recipe.findByIdAndDelete(id);
}

module.exports = { createRecipe, getAllRecipes, getRecipe, updateRecipe, deleteRecipe };
