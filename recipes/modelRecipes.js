const { ObjectId } = require('mongodb');
const connect = require('../users/connection');

async function createRecipes(name, ingredients, preparation, userId) {
  return connect()
    .then((db) => db.collection('recipes').insertOne({ name, ingredients, preparation, userId }))
    .then(({ insertedId }) => ({ name, ingredients, preparation, userId, _id: insertedId }))
    .catch((err) => err);
}

async function getRecipes() {
  return connect()
    .then((db) => db.collection('recipes').find({}).toArray());
}

async function getRecipesById(id) {
  return connect()
    .then((db) => db.collection('recipes').findOne(ObjectId(id)))
    .catch((err) => err);
}

async function updateRecipes(name, ingredients, preparation, id) {
  return connect()
    .then((db) => db.collection('recipes').updateOne({ _id: ObjectId(id) },
      { $set: { name, ingredients, preparation } }));
}

module.exports = {
  createRecipes,
  getRecipes,
  getRecipesById,
  updateRecipes,
};
