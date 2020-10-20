const { recipeModel } = require('../models');

const createRecipe = async (name, ingredients, preparation, userId) => {
  if (!name || !ingredients || !preparation || !userId) {
    return { code: 'invalid_data', message: 'Invalid entries. Try again.' };
  }

  const createdRecipe = await recipeModel.createRecipe(name, ingredients, preparation, userId);

  return createdRecipe;
};

const getAllRecipes = async () => recipeModel.getAllRecipes();

const getRecipeById = async (id) => {
  const recipe = await recipeModel.getRecipeById(id);

  if (!recipe) return { message: 'recipe not found' };
  return recipe;
};

const editRecipe = async (id, name, ingredients, preparation) => {
  const { userId } = await recipeModel.getRecipeById(id);

  const editedRecipe = await recipeModel.editRecipe(id, name, ingredients, preparation, userId);

  return editedRecipe;
};

const deleteRecipe = async (id) => recipeModel.deleteRecipe(id);

const addImageToRecipe = async (id, filename) => {
  const imagePath = `localhost:3000/images/${filename}`;

  const recipe = await recipeModel.getRecipeById(id);

  if (!recipe) return { message: 'recipe not found' };

  const addedImage = await recipeModel.addImageToRecipe(id, imagePath, recipe);

  return addedImage;
};

module.exports = {
  getAllRecipes,
  getRecipeById,
  createRecipe,
  editRecipe,
  deleteRecipe,
  addImageToRecipe,
};
