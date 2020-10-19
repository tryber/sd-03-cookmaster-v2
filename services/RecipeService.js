const {
  getAllRecipes,
  getRecipeById,
  createRecipe,
  editRecipe,
  deleteRecipe,
  addImageToRecipe,
} = require('../models');

const createRecipe = async (name, ingredients, preparation, user) => {
  if (!name || !ingredients || !preparation || !user) {
    return { code: 'invalid_data', message: 'Invalid entries. Try again.' };
  }
  const {
    _id: { id },
  } = user;
  const newRecipe = await createRecipe(name, ingredients, preparation, id);
  return newRecipe;
};

const getAllRecipes = async () => getAllRecipes();

const getRecipeById = async (id) => {
  if (id.length < 24) return { message: 'recipe not found' };
  const recipe = await getRecipeById(id);
  if (!recipe) return { message: 'recipe not found' };
  return recipe;
};

const editRecipe = async (id, name, ingredients, preparation) => {
  const { userId } = await getRecipeById(id);
  const editedRecipe = await editRecipe(id, name, ingredients, preparation, userId);
  return editedRecipe;
};

const deleteRecipe = async (id) => deleteRecipe(id);

const addImageToRecipe = async (id, filename) => {
  const path = `localhost:3000/images/${filename}`;
  const recipe = await getRecipeById(id);
  if (!recipe) return { message: 'recipe not found' };
  const newImage = await addImageToRecipe(id, path, recipe);
  return newImage;
};

module.exports = {
  getAllRecipes,
  getRecipeById,
  createRecipe,
  editRecipe,
  deleteRecipe,
  addImageToRecipe,
};
