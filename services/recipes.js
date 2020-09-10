const { recipesModel } = require('../models');
const { ObjectID } = require('mongodb');

const addRecipe = (userId, { name, ingredients, preparation }) => recipesModel
  .createRecipe({ name, ingredients, preparation, userId });

const getRecipes = () => recipesModel.getAllRecipes();

const getRecipeById = async (id) => recipesModel.getRecipe({ _id: ObjectID(id) });

module.exports = {
  addRecipe,
  getRecipes,
  getRecipeById,
};
