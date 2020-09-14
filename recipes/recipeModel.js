const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
  name: { type: String, require: true },
  ingredients: { type: String, require: true },
  preparation: { type: String, require: true },
  userId: { type: String },
});

const Recipe = mongoose.model('Recipe', recipeSchema);

const createRecipe = async (data) => {
  const recipe = new Recipe(data);
  const { _id } = recipe;
  const { _doc } = recipe.save();
  return { ..._doc, _id };
};

const getAll = async () => Recipe.find().exec();

const findById = async (id) => {
  if (!mongoose.isValidObjectId(id)) return false;
  const recipe = await Recipe.findById(id).exec();
  return recipe;
};

const updateRecipe = async (data, id) => {
  const updated = Recipe.findByIdAndUpdate(id, { data }).exec();
  return updated;
};

const exclude = async (id) => Recipe.findByIdAndDelete(id).exec();

module.exports = { createRecipe, getAll, findById, updateRecipe, exclude };
