const connection = require('./connection');

const getAllRecipes = async () =>
  connection()
    .then((db) => db.collection('recipes'))
    .then((table) => table.find().toArray());

module.exports = getAllRecipes;
