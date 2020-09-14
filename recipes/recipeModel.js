const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
  name: { type: String, require: true },
  ingredients: { type: String, require: true },
  preparation: { type: String, require: true },
  // userId: { type: String, require: true },
});

const Recipe = mongoose.model('Recipe', recipeSchema);

const createRecipe = async (data) => {
  const recipe = new Recipe(data);
  console.log('passei errado ');
  recipe.save();
  return recipe;
};

const getAll = async () => Recipe.find().exec();

const findById = async (id) => mongoose.isValidObjectId(id) && Recipe.findById(id);

module.exports = { createRecipe, getAll, findById };
