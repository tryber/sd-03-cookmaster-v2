const { CreateRecipe, ListAll, GetRecipe } = require('../services');
const { generateError } = require('../utils');

const createRecipe = async (req, res, next) => {
  try {
    const { name, ingredients, preparation } = req.body;
    const { _id } = req.user;

    const recipe = await CreateRecipe(name, ingredients, preparation, _id);

    if (recipe.message) throw new Error(recipe.message);

    return res.status(201).json({ recipe });
  } catch (error) {
    return next(generateError(400, error));
  }
};

const listRecipes = async (_req, res, next) => {
  try {
    const recipesList = await ListAll();
    return res.status(200).json([...recipesList]);
  } catch (error) {
    return next(generateError(400, error));
  }
};

const getRecipe = async (req, res, next) => {
  try {
    const { id } = req.params;

    const searchRecipe = await GetRecipe(id);

    return res.status(200).json({ ...searchRecipe });
  } catch (error) {
    return next(generateError(404, error));
  }
};

module.exports = { createRecipe, listRecipes, getRecipe };
