const rescue = require('express-rescue');
const recipesServices = require('../services/recipesServices');

const registerRecipes = rescue(async (req, res) => {
  const { name, ingredients, preparation } = req.body;
  const { _id: userId } = req.user;
  const newRecipe = await recipesServices.createRecipe(name, ingredients, preparation, userId);
  // if (newRecipe.err) return res.status(409).json(newRecipe.jsonMessage);

  return res.status(201).json(newRecipe);
});

const listRecipes = rescue(async (req, res) => {
  const recipes = await recipesServices.listRecipes();
  res.status(200).json(recipes);
});

module.exports = {
  registerRecipes,
  listRecipes,
};
