const { ObjectId } = require('mongodb');
const { connect } = require('./connection');

const setNewRecipe = async (name, ingredients, preparation, userId) =>
  connect()
    .then((db) => db.collection('recipes')
      .insertOne({ name, ingredients, preparation, userId }))
    .then(({ insertedId }) =>
      ({ recipe: { name, ingredients, preparation, userId, _id: insertedId } }));

const findAllRecipes = async () =>
  connect()
    .then((db) => db.collection('recipes').find({})
      .toArray());

const findRecipesById = async (id) =>
  connect()
    .then((db) => db.collection('recipes').findOne(ObjectId(id)));

module.exports = {
  setNewRecipe,
  findAllRecipes,
  findRecipesById,
};
