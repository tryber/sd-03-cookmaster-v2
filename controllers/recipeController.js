const rescue = require('express-rescue');
const recipeService = require('../services/recipeService');

const addRecipe = rescue(async (req, res) => {
  const { name, ingredients, preparation } = req.body;
  const { _id } = req.user;

  const result = await recipeService.addRecipe({ name, ingredients, preparation, userId: _id });

  if (result.error) return res.status(400).json({ message: result.message });

  res.status(201).json({ recipe: result });
});

const getRecipes = rescue(async (req, res) => {
  const result = await recipeService.getAllRecipes();

  res.status(200).json(result);
});

module.exports = {
  addRecipe,
  getRecipes,
};
