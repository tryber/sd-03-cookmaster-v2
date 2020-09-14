const rescue = require('express-rescue');
// Necessário para que a request seja respondida

const invaliDataError = { err: {
  code: 'invalid_data',
  message: 'Wrong id format',
} };

const recipeService = require('../service/recipeService');

const createRecipe = rescue(async (req, res) => {
  const newRecipe = await recipeService.insertOne(req.body, req.user._id);

  if (newRecipe.error) return res.status(400).json({ message: newRecipe.message });
  return res.status(201).json(newRecipe);
});

const getAllRecipes = rescue(async (_req, res) => {
  const recipes = await recipeService.getAll();
  res.status(200).json(recipes);
});

const getById = rescue(async (req, res) => {
  const recipe = await recipeService.getById(req.params.id);
  console.log(recipe);
  return recipe.length ?
  res.status(200).json(recipe) :
  res.status(404).json({ message: "recipe not found" });
});

const updateRecipe = rescue(async (req, res) => {
  const recipeId = req.params.id;
  const { name, ingredients, preparation } = req.body;
  const { _id, role } = req.user;

  const updRecp = await recipeService.updateOne(_id, role, recipeId, name, ingredients, preparation);

  if (updRecp.message) return res.status(401).json({ message: updRecp.message });
  return res.status(200).json({ ...updRecp, userId: _id });
});

const eraseRecipe = rescue(async (req, res) => {
  const { id } = req.params;
  const delRecp = await recipeService.deleteOne(id);

  if (delRecp) return res.status(422).json({ invaliDataError });
  return res.status(200).json(delRecp);
});

module.exports = {
  getAllRecipes,
  getById,
  createRecipe,
  updateRecipe,
  eraseRecipe,
};
