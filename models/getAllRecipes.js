const { connectCollumn } = require('./config');

const getAllRecipes = async () =>
  connectCollumn('recipes').then((table) => table.find().toArray());

module.exports = getAllRecipes;
