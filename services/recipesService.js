const recipesModel = require('../models/recipesModel');

const register = (name, ingredients, preparation, userId) => {
  const recipe = { name, ingredients, preparation, userId };
  return recipesModel.insert(recipe);
};

const getAll = () => recipesModel.getAll();

const getRecipeById = (id) => recipesModel.getRecipeById(id);

const update = (id, body) => recipesModel.update(id, body);

const deleteRecipe = (id) => recipesModel.remove(id);

module.exports = {
  register,
  getAll,
  getRecipeById,
  update,
  deleteRecipe,
};
