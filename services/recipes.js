const recipes = require('../models/recipes');
const { badRequest, notFound } = require('../MyErrors');

const setNewRecipe = async (name, ingredients, preparation, userId) => {
  if (!name || !ingredients || !preparation) return badRequest('Invalid entries. Try again.');
  const recipeSeted = await recipes.setNewRecipe(name, ingredients, preparation, userId);
  return recipeSeted;
};

const findAllRecipes = async () => {
  const allRecipes = await recipes.findAllRecipes();
  return allRecipes;
};

const findRecipesById = async (id) => {
  const recipe = await recipes.findRecipesById(id);
  if (recipe === null) return notFound('recipe not found');
  return recipe;
};

module.exports = {
  setNewRecipe,
  findAllRecipes,
  findRecipesById,
};
