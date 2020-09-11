const { ObjectId } = require('mongodb');
const connection = require('./connection');

const createRecipe = (name, ingredients, preparation, userId) =>
  connection()
    .then((db) => db
      .collection('recipes')
      .insertOne({ name, ingredients, preparation, userId: ObjectId(userId) }))
    .then(({ insertedId }) =>
      ({ _id: insertedId, name, ingredients, preparation, userId: ObjectId(userId) }))
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });

const getAllRecipes = async () =>
  connection()
    .then((db) => db.collection('recipes').find({}).toArray())
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });

const getRecipeById = async (id) =>
  connection()
    .then((db) => db.collection('recipes').findOne(ObjectId(id)))
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });

const updateRecipe = async (id, name, ingredients, preparation) =>
  connection()
    .then((db) => db
      .collection('recipes')
      .updateOne({ _id: id }, { $set: { name, ingredients, preparation } }))
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });

const deleteRecipe = async (id) =>
  connection()
    .then((db) => db.collection('recipes').deleteOne({ _id: ObjectId(id) }))
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });

const updateRecipeImage = async (id, path) =>
  connection()
    .then((db) => db
      .collection('recipes')
      .updateOne({ _id: id }, { $set: { image: `${path}${id}.jpeg` } }))
    .then(() => `${path}${id}.jpeg`)
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });

module.exports = {
  createRecipe,
  getAllRecipes,
  getRecipeById,
  updateRecipe,
  deleteRecipe,
  updateRecipeImage,
};
