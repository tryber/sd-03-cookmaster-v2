const {
  createRecipe,
  updateRecipe,
  uploadImage,
  deleteRecipe,
  allRecipes,
  recipeById,
} = require('../../models');
const recipeValidation = require('./recipeRegisterValidation');

const create = async (name, ingredients, preparation, userId) => {
  try {
    const validation = recipeValidation(name, ingredients, preparation);

    const newRecipe = !validation.message
    && (await createRecipe(name, ingredients, preparation, userId));

    return validation.message ? { message: validation.message } : { ...newRecipe };
  } catch (error) {
    throw new Error(error.message);
  }
};

const update = async (id, name, ingredients, preparation) => {
  try {
    const updateValidation = recipeValidation(name, ingredients, preparation);

    const modifyRecipe = !updateValidation.message
    && (await updateRecipe(id, name, ingredients, preparation));

    return updateValidation.message ? { message: updateValidation.message } : { ...modifyRecipe };
  } catch (error) {
    throw new Error(error.message);
  }
};

const uploadImageData = async (id, image) => {
  try {
    const upload = await uploadImage(id, image);

    return upload;
  } catch (error) {
    throw new Error(error.message);
  }
};

const deleteRecipeById = async (id) => {
  try {
    const eraseRecipe = await deleteRecipe(id);

    return eraseRecipe;
  } catch (error) {
    throw new Error(error.message);
  }
};

const listRecipes = async () => {
  try {
    const recipesList = await allRecipes();

    return [...recipesList];
  } catch (error) {
    throw new Error(error.message);
  }
};

const listRecipe = async (id) => {
  try {
    const recipeData = await recipeById(id);

    return recipeData;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = { create, update, uploadImageData, deleteRecipeById, listRecipes, listRecipe };
