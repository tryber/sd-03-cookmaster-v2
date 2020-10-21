const { connectIn, handleConnect } = require('./connection');

const createRecipe = handleConnect('recipes');

const getAllRecipes = async () => connectIn('recipes').then((table) => table.find().toArray());

module.exports = {
  createRecipe,
  getAllRecipes,
};
