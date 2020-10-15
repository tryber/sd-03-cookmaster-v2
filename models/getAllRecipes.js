const { connectCollumn } = require('./connection');

const getAllRecipes = async () =>
  connectCollumn('recipes').then((table) => table.find().toArray());

module.exports = getAllRecipes;
