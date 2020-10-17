const { Router } = require('express');
const rescue = require('express-rescue');
const recipeService = require('../services/recipeService');

const recipe = Router();

recipe.post('/', rescue(async (req, res) => {
  const { name, ingredients, preparation } = req.body;
  const { _id: userId } = req.user;
  const postRecipe = await recipeService.createRecipe(name, ingredients, preparation, userId);
  if (postRecipe.error) {
    return res.status(postRecipe.status).json({ message: postRecipe.message });
  }
  return res.status(201).json(postRecipe);
}));

recipe.get('/', async (_, res) => {
  const recipes = await recipeService.getAllRecipes();
  res.status(200).json(recipes);
});

recipe.get('/:id', async (req, res) => {
  const { id } = req.params;
  const getRecipe = recipeService.getRecipeById(id);
  if (getRecipe.error) {
    return res.status(getRecipe.status).json({ message: getRecipe.message });
  }
  return res.status(200).json(getRecipe);
});

recipe.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, ingredients, preparation } = req.body;
  const newRecipe = await recipeService.updateRecipe(id, { name, ingredients, preparation });
  if (newRecipe.error) {
    return res.status(newRecipe.status).json({ message: newRecipe.message });
  }
  return res.status(200).json(newRecipe);
});

module.exports = recipe;
