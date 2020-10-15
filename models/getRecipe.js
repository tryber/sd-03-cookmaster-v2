const connection = require('./connection');

const getRecipe = async (searchObj) =>
  connection()
    .then((db) => db.collection('recipes'))
    .then((table) => table.findOne(searchObj));

module.exports = getRecipe;
