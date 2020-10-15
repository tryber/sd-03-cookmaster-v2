const { ObjectID } = require('mongodb');
const connection = require('./connection');

const updateRecipe = async (id, newRecipe) =>
  connection()
    .then((db) => db.collection('recipe'))
    .then((table) =>
      table.updateOne({ _id: ObjectID(id) }, { $set: newRecipe }))
    .then(() => newRecipe);

module.exports = updateRecipe;
