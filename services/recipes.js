const recipes = require('../models/recipes');
const { badRequest } = require('../MyErrors');

const setNewRecipe = async (name, ingredients, preparation, userId) => {
  if (!name || !ingredients || !preparation) return badRequest('Invalid entries. Try again.');
  const recipeSeted = await recipes.setNewRecipe(name, ingredients, preparation, userId);
  return recipeSeted;
};

const findAllRecipes = async () => {
  const allRecipes = await recipes.findAllRecipes();
  return allRecipes;
};

module.exports = {
  setNewRecipe,
  findAllRecipes,
};
