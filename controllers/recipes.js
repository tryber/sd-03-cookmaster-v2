const Recipes = require('../services/Recipe');

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
  } catch (err) {
    next(err);
  }
}

module.exports = { createRecipes, listRecipes };
