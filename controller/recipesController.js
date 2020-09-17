const rescue = require('express-rescue');
// Necessário para que a request seja respondida

const recipeService = require('../service/recipeService');

const createRecipe = rescue(async (req, res) => {
  const newRecipe = await recipeService.insertOne(req.body, req.user._id);

  return newRecipe.message ?
  res.status(400).json(newRecipe) :
  res.status(201).json(newRecipe);
});

const getAllRecipes = rescue(async (_req, res) => {
  const recipes = await recipeService.getAll();
  res.status(200).json(recipes);
});

const getById = rescue(async (req, res) => {
  const recipe = await recipeService.getById(req.params.id);

  return recipe.name ?
  res.status(200).json(recipe) :
  res.status(404).json(recipe);
});

const updateRecipe = rescue(async (req, res) => {
  const recipeId = req.params.id;
  const { name, ingredients, preparation } = req.body;
  const { _id, role } = req.user;

  const updRecp = await recipeService.updateOne(
    _id,
    role,
    recipeId,
    name,
    ingredients,
    preparation,
  );

  return updRecp.message ?
  res.status(401).json({ message: updRecp.message }) :
  res.status(200).json({ ...updRecp, userId: _id });
});

const deleteRecipe = rescue(async (req, res) => {
  const { _id, role } = req.user;
  await recipeService.deleteOne(req.params.id, _id, role);
  res.status(204).end();
});

module.exports = {
  getAllRecipes,
  getById,
  createRecipe,
  updateRecipe,
  deleteRecipe,
};
