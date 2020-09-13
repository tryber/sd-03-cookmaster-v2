const recipes = require('../models/recipes');

const setNewRecipe = async (name, ingredients, preparation, userId) => {
  const recipeSeted = await recipes.setNewRecipe(name, ingredients, preparation, userId);
  return recipeSeted;
};

module.exports = {
  setNewRecipe,
};
