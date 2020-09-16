const { ObjectID } = require('mongodb');
const { connectTo, stdAdd } = require('./connect');

const createRecipe = stdAdd('recipes');

const getAllRecipes = async () => connectTo('recipes').then((table) => table.find().toArray());

const getRecipe = async (searchObj) =>
  connectTo('recipes').then((table) => table.findOne(searchObj));

const updateRecipe = async (id, newRecipe) =>
  connectTo('recipe')
    .then((table) =>
      table.updateOne({ _id: ObjectID(id) }, { $set: newRecipe }),
    )
    .then(() => newRecipe);

const deleteRecipe = async (id) => connectTo('recipe')
  .then((table) => table.deleteOne({ _id: ObjectID(id) }));

module.exports = {
  createRecipe,
  getAllRecipes,
  getRecipe,
  updateRecipe,
  deleteRecipe,
};
