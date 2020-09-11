const { recipesModel } = require('../models');
const { ObjectID } = require('mongodb');

const addRecipe = (userId, { name, ingredients, preparation }) =>
  recipesModel.createRecipe({ name, ingredients, preparation, userId });

const getRecipes = () => recipesModel.getAllRecipes();

const getRecipeById = async (id) => recipesModel.getRecipe({ _id: ObjectID(id) });

const validateOwnerShip = async (userId, recipeId) =>
  recipesModel.getRecipe({ _id: ObjectID(recipeId) }).then((recipe) => {
    if (!recipe) return { error: true, message: 'No recipe' };
    if (recipe.userId !== userId) return { error: true, message: 'No your recipe' };
    return recipe;
  });

const updateRecipe = async (recipeId, name, ingredients, preparation) =>
  recipesModel.updateRecipe(recipeId, { name, ingredients, preparation });

const putImageOnRecipe = async (recipeId, image) =>
  recipesModel.getRecipe({ _id: ObjectID(recipeId) }).then((recipe) => {
    if (!recipe) return { error: true, message: 'No recipe' };
    return recipesModel.updateRecipe(recipeId, { image }).then(() => ({ image, ...recipe }));
  });

const deleteRecipe = async (recipeId) => recipesModel.deleteRecipe(recipeId);

module.exports = {
  addRecipe,
  getRecipes,
  getRecipeById,
  updateRecipe,
  putImageOnRecipe,
  deleteRecipe,
  validateOwnerShip,
};
