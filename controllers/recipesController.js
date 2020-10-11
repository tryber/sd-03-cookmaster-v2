const { recipesService } = require('../services');

const createRecipe = async (req, res) => {
  const { name, ingredients, preparation } = req.recipe;
  const { _id: id } = req.user;

  const recipeData = await recipesService.createRecipe({ name, ingredients, preparation, id });

  res.status(201).json(recipeData);
};

const getAllRecipes = async (_req, res) => {
  const recipes = await recipesService.getAllRecipes();
  
  res.status(200).json(recipes);
};

module.exports = {
  createRecipe,
  getAllRecipes,
};
