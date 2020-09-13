const recipes = require('../models/recipes');
const { unauthorized } = require('../MyErrors');

const setNewRecipe = async (name, ingredients, preparation, userId) => {
  if (!name || !ingredients || !preparation) return unauthorized('Invalid entries. Try again.');
  const recipeSeted = await recipes.setNewRecipe(name, ingredients, preparation, userId);
  return recipeSeted;
};

module.exports = {
  setNewRecipe,
};
