const { recipesModel } = require('../models');

const addRecipe = async (data) => {
  const { name, ingredients, preparation } = data;
  const createdRecipe = await recipesModel.createRecipe(name, ingredients, preparation);
  return createdRecipe;
};

module.exports = {
  addRecipe,
};
