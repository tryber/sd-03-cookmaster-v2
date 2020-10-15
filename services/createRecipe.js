const models = require('../models');

const createRecipe = (userId, { name, ingredients, preparation }) =>
  models.createRecipe({ name, ingredients, preparation, userId });

module.exports = createRecipe;
