const { Router } = require('express');
// const rescue = require('express-rescue');
const recipeService = require('../services/recipeService');

const recipe = Router();

recipe.post('/', async (req, res) => {
  const { name, ingredients, preparation } = req.body;
  const { _id: userId } = req.user;
  const postRecipe = await recipeService.createRecipe(name, ingredients, preparation, userId);
  console.log(postRecipe);
  if (postRecipe.error) {
    return res.status(postRecipe.status).json({ message: postRecipe.message });
  }
  return res.status(201).json(postRecipe);
});

module.exports = recipe;
