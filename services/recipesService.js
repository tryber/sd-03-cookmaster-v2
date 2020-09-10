const recipesModel = require('../models/recipesModel');

const register = async (name, ingredients, preparation, userId) => {
  const recipe = { name, ingredients, preparation, userId };
  return await recipesModel.insert(recipe);
};

const getAll = async () => {
  return await recipesModel.getAll();
};

const getRecipeById = async (id) => {
  return await recipesModel.getRecipeById(id);
};

const update = async (id, body) => {
  return await recipesModel.update(id, body);
};

const deleteRecipe = async (id) => {
  return await recipesModel.remove(id);
};

module.exports = {
  register,
  getAll,
  getRecipeById,
  update,
  deleteRecipe,
};
