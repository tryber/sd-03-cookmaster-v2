const { CreateRecipe, ListAll } = require('../services');
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

const listRecipes = async (req, res, next) => {
  try {
    const recipesList = await ListAll();
    return res.status(200).json([...recipesList]);
  } catch (error) {
    return next(generateError(400, error));
  }
};

module.exports = { createRecipe, listRecipes };
