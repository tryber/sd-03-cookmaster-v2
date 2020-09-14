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

const update = (id, name, ingredients, preparation) =>
  connect()
    .then((db) => db.collection('recipes').updateOne({ _id: ObjectId(id) }, { $set: { name, ingredients, preparation } }))
    .then(() => ({ _id: id, name, ingredients, preparation }));

module.exports = {
  getAll,
  getRecipeById,
  add,
  update,
};
