const recipes = require('../models/recipes');
const { badRequest, notFound } = require('../MyErrors');

const checkForHexRegExp = (id) => /^[0-9a-fA-F]{24}$/.test(id);

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
  if (!checkForHexRegExp(id)) return notFound('recipe not found');
  const recipe = await recipes.findRecipesById(id);
  if (recipe === null) return notFound('recipe not found');
  return recipe;
};

const editRecipe = async (id, name, ingredients, preparation, userId, role) => {
  if (!name || !ingredients || !preparation) return badRequest('Invalid entries. Try again.');
  if (!checkForHexRegExp(id)) return notFound('recipe not found');
  const recipe = await recipes.findRecipesById(id);
  if (recipe === null) return notFound('recipe not found');
  if (recipe.userId.toString() === userId.toString() || role === 'admin') {
    const recipeEdited = await recipes.editRecipe(id, name, ingredients, preparation, userId);
    return recipeEdited;
  }
  return badRequest('Invalid entries. Try again.');
};

module.exports = {
  setNewRecipe,
  findAllRecipes,
  findRecipesById,
  editRecipe,
};
