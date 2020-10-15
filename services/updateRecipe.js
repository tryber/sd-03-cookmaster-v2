const models = require('../models');

const updateRecipe = async (recipeId, name, ingredients, preparation) =>
  models.updateRecipe(recipeId, { name, ingredients, preparation });

module.exports = updateRecipe;
