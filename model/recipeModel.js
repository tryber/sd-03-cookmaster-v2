const { ObjectId } = require('mongodb');
const connection = require('./connection');

const newRecipe = async (name, ingredients, preparation, userId) =>
  connection()
    .then((db) => db.collection('recipes').insertOne({ name, ingredients, preparation, userId }))
    .then((result) => ({ name, ingredients, preparation, userId, _id: result.insertedId }));

const getRecipes = async () =>
  connection().then((db) => db.collection('recipes').find({}).toArray());

const getRecipeById = async (id) =>
  connection().then((db) => db.collection('recipes').findOne(ObjectId(id)));

const updateRecipe = async (id, name, ingredients, preparation, userId) =>
  connection()
    .then((db) =>
      db
        .collection('recipes')
        .updateOne({ _id: ObjectId(id) }, { $set: { name, ingredients, preparation } }))
    .then(() => ({ _id: id, name, ingredients, preparation, userId }));

module.exports = {
  newRecipe,
  getRecipes,
  getRecipeById,
  updateRecipe,
};
