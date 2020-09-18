const { ObjectId } = require('mongodb');
const recipesModel = require('../models/recipesModel');

const getAllRecipes = async () => {
  const list = await recipesModel.getAllRecipes();
  return list;
};

const validateImputsRecipe = async (name, ingredients, preparation) => {
  if (!name || !ingredients || !preparation) {
    return {
      cod: 400,
      error: true,
      message: 'Invalid entries. Try again.',
    };
  }
  return { error: false };
};

const createRecipe = async (name, ingredients, preparation, userId) => {
  const validation = await validateImputsRecipe(name, ingredients, preparation);

  if (validation.error) return validation;

  return recipesModel.createRecipe(name, ingredients, preparation, userId);
};

const getRecipeById = async (id) => {
  let recipe = null;

  if (id.length === 24) {
    recipe = await recipesModel.getRecipeById(id);
  }

  if (!recipe) {
    return {
      cod: 404,
      error: true,
      message: 'recipe not found',
    };
  }

  return recipe;
};

const updateRecipe = async (id, name, ingredients, preparation, _id, role) => {
  const recipe = await getRecipeById(id);

  if (role !== 'admin' && ObjectId(recipe.userId).toString() !== ObjectId(_id).toString()) {
    return {
      cod: 401,
      error: true,
      message: 'Permision denied',
    };
  }

  return recipesModel.updateRecipe(id, name, ingredients, preparation, recipe.userId);
};

const deleteRecipe = async (id, _id, role) => {
  const recipe = await getRecipeById(id);

  if (role !== 'admin' && ObjectId(recipe.userId).toString() !== ObjectId(_id).toString()) {
    return {
      cod: 401,
      error: true,
      message: 'Permision denied',
    };
  }

  return recipesModel.deleteRecipe(id);
};

const updateRecipeImage = async (id, image, _id, role) => {
  const recipe = await getRecipeById(id);
  const { name, ingredients, preparation, userId } = recipe;

  if (role !== 'admin' && ObjectId(userId).toString() !== ObjectId(_id).toString()) {
    return {
      cod: 401,
      error: true,
      message: 'Permision denied',
    };
  }

  return recipesModel.updateRecipeImage(id, name, ingredients, preparation, userId, image);
};

module.exports = {
  getAllRecipes,
  createRecipe,
  getRecipeById,
  updateRecipe,
  deleteRecipe,
  updateRecipeImage,
};
