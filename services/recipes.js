const { recipesModel } = require('../models');

const addRecipe = (userId, { name, ingredients, preparation }) =>
  recipesModel.createRecipe({ name, ingredients, preparation, userId });

const getAllRecipes = () => recipesModel.getAllRecipes();

module.exports = {
  addRecipe,
  getAllRecipes,
};
