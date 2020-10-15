const { ObjectID } = require('mongodb');
const { connectCollumn } = require('./connection');

const updateRecipe = async (id, newRecipe) =>
  connectCollumn('recipe')
    .then((table) =>
      table.updateOne({ _id: ObjectID(id) }, { $set: newRecipe }))
    .then(() => newRecipe);

module.exports = updateRecipe;
