const { CreateRecipe, ListAll, GetRecipe, UpdateRecipe, DeleteRecipe } = require('../services');
const { generateError, shallowComparation } = require('../utils');

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
    const recipeData = await GetRecipe(id);

    /* userId e _id são ObjectID do MongoDB, para
    compará-los usei uma função de comparação de objetos */
    if (shallowComparation(recipeData.userId, _id) && role !== 'admin') {
      throw new Error('Unauthorized');
    }
    const modifyRecipe = await UpdateRecipe(id, name, ingredients, preparation);

    return res.status(200).json({ ...modifyRecipe });
  } catch (error) {
    return next(generateError(401, error));
  }
};

const deleteRecipe = async (req, res, next) => {
  const { params, user } = req;
  const { id } = params;
  const { _id, role } = user;
  try {
    const recipeData = await GetRecipe(id);

    if (shallowComparation(recipeData.userId, _id) && role !== 'admin') {
      throw new Error('Unauthorized');
    }

    await DeleteRecipe(id);

    return res.status(204).json(null);
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

module.exports = { createRecipe, listRecipes, getRecipe, updateRecipe, deleteRecipe };
