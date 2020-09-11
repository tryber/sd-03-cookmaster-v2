const Recipes = require('../services/Recipe');
const Err = require('../services/Error');

const err = new Err();

async function createRecipes(req, res, next) {
  try {
    const { body } = req;
    const recipe = await Recipes.createRecipe(body);
    res.status(201).json({ recipe });
  } catch (error) {
    next(error);
  }
}

async function listRecipes(req, res, next) {
  try {
    const recipes = await Recipes.getAllRecipes();
    res.status(200).json(recipes);
  } catch (e) {
    next(e);
  }
}

async function getRecipe(req, res, next) {
  try {
    const { id } = req.params;
    const recipe = await Recipes.getRecipe(id);
    if (!recipe) {
      return next(err.recipeNotFound);
    }
    res.status(200).json(recipe);
  } catch (e) {
    next(err.recipeNotFound);
  }
}

async function updateRecipe(req, res, next) {
  try {
    const { id } = req.params;
    const data = req.body;
    const recipe = await Recipes.updateRecipe(id, data);
    return res.status(200).send(recipe);
  } catch (error) {
    return next(error);
  }
}

async function deleteRecipe(req, res, next) {
  try {
    const { id } = req.params;
    const recipe = await Recipes.deleteRecipe(id);
    return res.status(204).send(recipe);
  } catch (error) {
    return next(error);
  }
}

async function uploadImage(req, res, next) {
  try {
    const { id } = req.params;
    const { path, mimetype } = req.file;
    const [, extension] = mimetype.split('/');
    const recipe = await Recipes.addImagePath(id, `${path}.${extension}`);

    return res.status(200).json(recipe);
  } catch (error) {
    return next(error);
  }
}

module.exports = { createRecipes, listRecipes, getRecipe, updateRecipe, deleteRecipe, uploadImage };
