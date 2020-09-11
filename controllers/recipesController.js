const rescue = require('express-rescue');
const ObjectId = require('mongoose');
const { ErrorClass } = require('../utils/ErrorClass');
const {
  insertNewRecipe,
  getRecipes,
  getRecipeWithId,
  updateRecipeById,
} = require('../services/recipesService');

const newRecipe = rescue(async (req, res) => {
  const { _id } = req.user;
  const { name, ingredients, preparation } = req.body;

  if (!name || !ingredients || !preparation) {
    throw new ErrorClass(400, 'Invalid entries. Try again.', 'invalid_data');
  }

  const recipe = await insertNewRecipe({ userId: _id, name, ingredients, preparation });
  return res.status(201).json(recipe);
});

const getAllRecipes = rescue(async (_req, res) => {
  const allRecipes = await getRecipes();
  return res.status(200).json(allRecipes);
});

const getRecipeById = rescue(async (req, res) => {
  const { id } = req.params;

  if (!ObjectId.isValidObjectId(id)) {
    throw new ErrorClass(404, 'recipe not found', 'not_found');
  }

  const recipe = await getRecipeWithId(id);

  if (!recipe) {
    throw new ErrorClass(404, 'recipe not found', 'not_found');
  }

  return res.status(200).json(recipe);
});

const updateRecipe = rescue(async (req, res) => {
  const { _id, role } = req.user;
  const { id } = req.params;
  // console.log(req.user);
  if (!ObjectId.isValidObjectId(id)) {
    throw new ErrorClass(404, 'recipe not found', 'not_found');
  }

  const recipe = await getRecipeWithId(id);

  if (!recipe) {
    throw new ErrorClass(404, 'recipe not found', 'not_found');
  }

  if (!recipe.userId.equals(_id)) {
    console.log('passou aqui');
    if (role !== 'admin') {
      throw new ErrorClass(404, 'not owner or admin', 'without_authorization');
    }
  }

  const { name, ingredients, preparation } = req.body;

  const updatedRecipe = await updateRecipeById(id, { name, ingredients, preparation });
  return res.status(200).json(updatedRecipe);
});

module.exports = {
  newRecipe,
  getAllRecipes,
  getRecipeById,
  updateRecipe,
};
