const recipesService = require('../services/recipes');

const setNewRecipe = async (req, res, next) => {
  const { name, ingredients, preparation } = req.recipe;
  const { userId } = req;
  const recipe = await recipesService.setNewRecipe(name, ingredients, preparation, userId);
  if (recipe.error) return next(recipe);
  return res.status(201).json(recipe);
};

module.exports = {
  setNewRecipe,
};
