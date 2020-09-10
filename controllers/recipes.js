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

module.exports = { createRecipes };
