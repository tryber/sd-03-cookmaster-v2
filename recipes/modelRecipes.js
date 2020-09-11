const { ObjectId } = require('mongodb');
const connect = require('../users/connection');

async function createRecipes(name, ingredients, preparation, userId) {
  return connect()
    .then((db) => db.collection('recipes').insertOne({ name, ingredients, preparation, userId }))
    .then(({ insertedId }) => ({ name, ingredients, preparation, userId, _id: insertedId }));
}

async function getRecipes() {
  return connect()
    .then((db) => db.collection('recipes').findOne({}));
}

async function getRecipesById(id) {
  return connect()
    .then((db) => db.collection('recipes').findOne(ObjectId(id)));
}

module.exports = {
  createRecipes,
  getRecipes,
  getRecipesById,
};
