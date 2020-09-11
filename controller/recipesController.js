const rescue = require('express-rescue');

const recipeService = require('../service/recipeService');

const newRecipe = rescue(async (req, res, next) => {
  const { name, ingredients, preparation } = req.body;
  const { _id } = req.user;

  const recipe = await recipeService.newRecipe(name, ingredients, preparation, _id);

  if (recipe.code) next(recipe);

  return res.status(201).json(recipe);
});

module.exports = {
  newRecipe,
};
