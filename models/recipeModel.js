const { ObjectId } = require('mongodb');
const connect = require('./connect');

const getAll = async () =>
  connect().then((db) => db.collection('recipes').find({}).toArray());

const getRecipeById = async (id) =>
  connect().then((db) => db.collection('recipes').findOne(ObjectId(id)));

const add = ({ name, ingredients, preparation, userId }) =>
  connect()
    .then((db) => db.collection('recipes').insertOne({ name, ingredients, preparation, userId }))
    .then(({ insertedId }) => ({ name, ingredients, preparation, userId, _id: insertedId }));

module.exports = {
  getAll,
  getRecipeById,
  add,
};
