const { handleColumn } = require('./connection');

const createRecipe = handleColumn('recipes');

module.exports = createRecipe;
