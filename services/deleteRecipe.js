const models = require('../models');

const deleteRecipe = async (recipeId) => models.deleteRecipe(recipeId);

module.exports = deleteRecipe;
