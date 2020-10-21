const { recipesModel } = require('../models');

const addRecipe = (userId, { name, ingredients, preparation }) =>
  recipesModel.createRecipe({ name, ingredients, preparation, userId });

module.exports = {
  addRecipe,
};
