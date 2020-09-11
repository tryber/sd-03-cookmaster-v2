const recipeModel = require('../models/recipesModel');

const createRecipe = async (name, ingredients, preparation, userId) => {
  const createdRecipe = await recipeModel.createRecipe(name, ingredients, preparation, userId);
  const { _id } = createdRecipe;
  return { recipe: { name, ingredients, preparation, userId, _id } };
};

const listRecipes = async () => recipeModel.getAllRecipes();

module.exports = {
  createRecipe,
  listRecipes,
};
