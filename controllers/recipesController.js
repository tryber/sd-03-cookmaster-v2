const rescue = require('express-rescue');
const { recipesService } = require('../services');

const newRecipe = rescue(async (req, res) => {
  const { name, ingredients, preparation } = req.body;
  const { userId } = req.user;

  const result = await recipesService.addRecipe({ name, ingredients, preparation, userId });

  if (result.error) return res.status(400).json(result.error);

  return res.status(201).json(result);
});

const showAllRecipes = rescue(async (_req, res) => {
  try {
    const result = await recipesService.listAllRecipes();
    return res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error });
  }
});

const showRecipeById = rescue(async (req, res) => {
  const { id } = req.params;
  const result = await recipesService.getRecipeById(id);

  if (result.error) return res.status(404).json(result.error);

  return res.status(200).json(result);
});

const editRecipe = rescue(async (req, res) => {
  const { id } = req.params;
  const { name, ingredients, preparation } = req.body;
  const { _id: userId } = req.user;

  const result = await recipesService.updateRecipe(id, userId, name, ingredients, preparation);
  return res.status(200).json(result);
});

module.exports = {
  newRecipe,
  showAllRecipes,
  showRecipeById,
  editRecipe,
};
