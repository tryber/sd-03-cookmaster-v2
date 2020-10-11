const connect = require('./connect');
const { ObjectId } = require('mongodb');

const create = async (name, ingredients, preparation, userId) => connect()
.then((db) =>
  db
  .collection('recipes')
  .insertOne({ name, ingredients, preparation, userId }))
  .then(({ insertedId }) => (
    { recipe: {
      name,
      ingredients,
      preparation,
      userId,
      _id: insertedId,
    },
    }));

const listAll = async () => connect()
  .then((db) =>
  db
  .collection('recipes')
  .find({})
  .toArray(),
  );

const selectById = async (id) => connect()
  .then((db) =>
    db
    .collection('recipes')
    .findOne(ObjectId(id)),
  );

const update = async (id, name, ingredients, preparation) => connect()
  .then((db) =>
    db
    .collection('recipes')
    .findOneAndUpdate(
      { _id: ObjectId(id) },
      { $set: { name, ingredients, preparation } }))
    .then(() => ({ id, name, ingredients, preparation }));

const setImagePath = async (id, recipe, image) => connect()
  .then((db) =>
    db
    .collection('recipes')
    .findOneAndUpdate(
      { _id: ObjectId(id) },
      { $set: { image } }))
      .then(() => ({ ...recipe, image }));

const erase = async (id) => connect()
.then((db) =>
  db
  .collection('recipes')
  .findOneAndDelete({ _id: ObjectId(id) }))
  .then((response) => (response.value));

module.exports = {
  listAll,
  selectById,
  create,
  update,
  setImagePath,
  erase,
};
