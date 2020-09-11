const rescue = require('express-rescue');
const { ErrorClass } = require('../utils/ErrorClass');
const { insertNewRecipe, getRecipes } = require('../services/recipesService');

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

module.exports = {
  newRecipe,
  getAllRecipes,
};
