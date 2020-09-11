const { recipesModel } = require('../models');

const addRecipe = async (data) => {
  const { name, ingredients, preparation, userId } = data;
  const createdRecipe = await recipesModel.createRecipe(name, ingredients, preparation, userId);
  return createdRecipe;
};

module.exports = {
  addRecipe,
};
