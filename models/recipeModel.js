const { ObjectId } = require('mongodb');
const connection = require('./connect');

const getAll = async () => connection().then((db) => db.collection('recipes').find({}).toArray());

const findRecipeById = async (id) =>
  connection().then((db) => db.collection('recipes').findOne(ObjectId(id)));

const createNewRecipe = async (name, ingredients, preparation, userId) =>
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

const editRecipe = async (id, name, ingredients, preparation, userId) =>
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

const deleteRecipe = async (id) =>
  connection().then((db) => db.collection('recipe').deleteOne({ _id: ObjectId(id) }));

module.exports = {
  createNewRecipe,
  getAll,
  findRecipeById,
  editRecipe,
  deleteRecipe,
};
