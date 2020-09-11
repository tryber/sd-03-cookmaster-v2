const { CreateRecipe, ListAll, GetRecipe, UpdateRecipe } = require('../services');
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

const updateRecipe = async (req, res, next) => {
  const { body, params, user } = req;
  const { name, ingredients, preparation } = body;
  const { id } = params;
  const { _id, role } = user;
  try {
    if (!user) throw new Error('missing auth token');
    const recipeData = await GetRecipe(id);

    if (recipeData.userId === _id || role === 'admin') {
      const modifyRecipe = await UpdateRecipe(name, ingredients, preparation);
      return res.status(200).json({ ...modifyRecipe });
    }
  } catch (error) {
    return next(generateError(401, error));
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

module.exports = { createRecipe, listRecipes, getRecipe, updateRecipe };
