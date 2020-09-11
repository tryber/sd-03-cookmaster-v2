const recipeModel = require('../models/recipeModel');
const { ObjectId } = require('mongodb');

const verifyFields = (name, ingredients, preparation) => {
  if (!name) {
    return { status: 400, message: 'Invalid entries. Try again.' };
  }
  if (!ingredients)  {
    return { status: 400, message: 'Invalid entries. Try again.' };
  }
  if (!preparation) {
    return { status: 400, message: 'Invalid entries. Try again.' };
  }
  return null;
};

const add = async (name, ingredients, preparation, id) => {
  const verify = verifyFields(name, ingredients, preparation);

  if (verify) return verify;

  return recipeModel.add(name, ingredients, preparation, id);
};

const findRecipe = async (id) => {
  if (id.length < 24) {
    return { status: 404, message: 'recipe not found' };
  }

  const recipe = await recipeModel.findById(id);

  if (!recipe) {
    return { status: 404, message: 'recipe not found' };
  }

  return recipe;
};

const updateRecipe = async (currentUserId, id, name, ingredients, preparation, role) => {
  const { userId } = await recipeModel.findById(id);
  if (ObjectId(userId).toString() !== ObjectId(currentUserId).toString() && role !== 'admin') {
    return { status: 401, message: 'You do not own this recipe.' };
  }

  return recipeModel.updateById(id, name, ingredients, preparation);
};

const remove = async (currentUserId, id, role) => {
  const { userId } = await recipeModel.findById(id);
  if (ObjectId(userId).toString() !== ObjectId(currentUserId).toString() && role !== 'admin') {
    return { status: 401, message: 'You do not own this recipe.' };
  }

  return recipeModel.removeById(id);
};

module.exports = {
  add,
  findRecipe,
  updateRecipe,
  remove,
}
