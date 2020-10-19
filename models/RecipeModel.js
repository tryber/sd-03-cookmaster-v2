const { ObjectId } = require('mongodb');
const connection = require('./Connection');

const create = async (name, ingredients, preparation, userId) =>
  connection().then((db) =>
    db
      .collection('recipes')
      .insertOne({ name, ingredients, preparation, userId })
      .then(({ insertedId }) => ({
        name,
        ingredients,
        preparation,
        userId,
        _id: insertedId,
      })),
  );

const edit = async (id, name, ingredients, preparation, userId) =>
  connection()
    .then((db) =>
      db
        .collection('recipes')
        .updateOne({ _id: ObjectId(id) }, { $set: { name, ingredients, preparation } }),
    )
    .then(() => ({
      _id: id,
      name,
      ingredients,
      preparation,
      userId,
    }));

const deleteIt = async (id) =>
  connection().then((db) => db.collection('recipes').deleteOne({ _id: ObjectId(id) }));

const addImage = async (id, image, initialState) =>
  connection()
    .then((db) => db.collection('recipes').updateOne({ _id: ObjectId(id) }, { $set: { image } }))
    .then(() => ({ ...initialState, image }));

const getAll = async () =>
    connection().then((db) => db.collection('recipes').find({}).toArray());

const getById = async (id) =>
    connection().then((db) => db.collection('recipes').findOne(ObjectId(id)));

module.exports = {
  create,
  getAll,
  getById,
  edit,
  deleteIt,
  addImage,
};
