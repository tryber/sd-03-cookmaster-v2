const { ObjectID } = require('mongodb');
const { recipesModel } = require('../models');

const addRecipe = (userId, { name, ingredients, preparation }) =>
  recipesModel.createRecipe({ name, ingredients, preparation, userId });

const getAllRecipes = () => recipesModel.getAllRecipes();

const getRecipeById = async (id) => recipesModel.getRecipe({ _id: ObjectID(id) });

const checkUserOwner = async (userId, recipeId) =>
  recipesModel.getRecipe({ _id: ObjectID(recipeId) })
    .then((recipe) => {
      if (!recipe) return { error: true, message: 'No recipe' };
      if (recipe.userId !== userId) return { error: true, message: 'No your recipe' };
      return recipe;
    });

const updateRecipe = async (recipeId, name, ingredients, preparation) =>
  recipesModel.updateRecipe(recipeId, { name, ingredients, preparation });

const deleteRecipe = async (recipeId) => recipesModel.deleteRecipe(recipeId);

module.exports = {
  addRecipe,
  getAllRecipes,
  getRecipeById,
  updateRecipe,
  checkUserOwner,
  deleteRecipe,
};
