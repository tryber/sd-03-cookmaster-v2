const { ObjectID } = require('mongodb');
const { connectCollumn } = require('./connection');

const deleteRecipe = async (id) =>
  connectCollumn('recipe')
    .then((table) => table.deleteOne({ _id: ObjectID(id) }));

module.exports = deleteRecipe;
