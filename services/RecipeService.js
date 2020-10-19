const {
  getAll,
  getById,
  create,
  edit,
  deleteIt,
  addImage,
} = require('../models');

const createRecipe = async (name, ingredients, preparation, user) => {
  if (!name || !ingredients || !preparation || !user) {
    return { code: 'invalid_data', message: 'Invalid entries. Try again.' };
  }
  const {
    _id: { id },
  } = user;
  const newRecipe = await create(name, ingredients, preparation, id);
  return newRecipe;
};

const getAllRecipes = async () => getAll();

const getRecipeById = async (id) => {
  if (id.length < 24) return { message: 'recipe not found' };
  const recipe = await getById(id);
  if (!recipe) return { message: 'recipe not found' };
  return recipe;
};

const editRecipe = async (id, name, ingredients, preparation) => {
  const { userId } = await getById(id);
  const editedRecipe = await edit(id, name, ingredients, preparation, userId);
  return editedRecipe;
};

const deleteRecipe = async (id) => deleteIt(id);

const addImageToRecipe = async (id, filename) => {
  const path = `localhost:3000/images/${filename}`;
  const recipe = await getById(id);
  if (!recipe) return { message: 'recipe not found' };
  const newImage = await addImage(id, path, recipe);
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
