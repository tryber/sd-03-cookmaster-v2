const boom = require('@hapi/boom');
const { recipesService } = require('../services');

const createRecipe = async (req, res) => {
  const { name, ingredients, preparation } = req.recipe;
  const { _id: userId } = req.user;

  const recipeData = await recipesService.createRecipe({ name, ingredients, preparation, userId });

  res.status(201).json(recipeData);
};

const getAllRecipes = async (_req, res) => {
  const recipes = await recipesService.getAllRecipes();

  res.status(200).json(recipes);
};

const getRecipeById = async (req, res, next) => {
  const { id } = req.params;

  const recipe = await recipesService.getRecipeById(id);

  if (!recipe) {
    return next(boom.notFound('recipe not found'));
  }

  res.status(200).json(recipe);
};

const editRecipe = async (req, res, next) => {
  const { id } = req.params;
  const { name, ingredients, preparation } = req.body;

  const updatedRecipe = await recipesService.editRecipe({ id, name, ingredients, preparation });

  if (!updatedRecipe) {
    return next(boom.notFound('Invalid Id, or inexistent recipe!'));
  }

  res.status(200).json(updatedRecipe);
};

const deleteRecipe = async (req, res, _next) => {
  const { _id: idLoged } = req.user;
  const { id: recipeId } = req.params;

  await recipesService.deleteRecipe({ recipeId, idLoged });

  res.status(204).end();
};

const editImageRecipe = async (req, res, next) => {
  const { id } = req.params;
  const { filename } = req.file;

  const recipeWithImage = await recipesService.editImageRecipe({ id, filename });

  if (!recipeWithImage) {
    return next(boom.notFound('Recipe not found!'));
  }

  res.status(200).json(recipeWithImage);
};

module.exports = {
  editRecipe,
  createRecipe,
  deleteRecipe,
  getAllRecipes,
  getRecipeById,
  editImageRecipe,
};
