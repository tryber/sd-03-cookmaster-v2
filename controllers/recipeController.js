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

const getRecipeById = rescue(async (req, res) => {
  const { id } = req.params;
  const result = await recipeService.getRecipeById(id);

  if (result.error) return res.status(404).json({ message: result.message });

  res.status(200).json(result);
});

const editRecipe = rescue(async (req, res) => {
  const { id } = req.params;
  const { name, ingredients, preparation } = req.body;
  const result = await recipeService.editRecipe({ id, name, ingredients, preparation });

  if (result.error) return res.status(401).json({ message: result.message });

  res.status(200).json(result);
});

module.exports = {
  addRecipe,
  getRecipes,
  getRecipeById,
  editRecipe,
};
