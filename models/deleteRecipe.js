const { ObjectID } = require('mongodb');
const connection = require('./connection');

const deleteRecipe = async (id) =>
  connection()
    .then((db) => db.collection('recipes'))
    .then((table) => table.deleteOne({ _id: ObjectID(id) }));

module.exports = deleteRecipe;
