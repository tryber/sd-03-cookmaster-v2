const { connectCollumn } = require('./connection');

const getRecipe = async (searchObj) =>
  connectCollumn('recipes').then((table) => table.findOne(searchObj));

module.exports = getRecipe;
