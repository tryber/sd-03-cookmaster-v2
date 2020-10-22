const { ObjectID } = require('mongodb');
const { connectIn, handleConnect } = require('./connection');

const createRecipe = handleConnect('recipes');

const getAllRecipes = async () => connectIn('recipes').then((doc) => doc.find().toArray());

const getRecipe = async (id) =>
  connectIn('recipes').then((doc) => doc.findOne(id));

const updateRecipe = async (id, newRecipe) =>
  connectIn('recipe')
    .then((doc) =>
      doc.updateOne({ _id: ObjectID(id) }, { $set: newRecipe }))
    .then(() => newRecipe);

const deleteRecipe = async (id) => connectIn('recipe')
  .then((doc) => doc.deleteOne({ _id: ObjectID(id) }));

module.exports = {
  createRecipe,
  getAllRecipes,
  getRecipe,
  updateRecipe,
  deleteRecipe,
};
