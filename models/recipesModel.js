const { ObjectId } = require('mongodb');

const { connect } = require('./connect');

const getAllRecipes = async () => (
  connect().then((db) => (db).collection('recipes').find({}).toArray())
);

const createRecipe = async (name, ingredients, preparation, userId) => (
  connect()
    .then((db) => (
      db.collection('recipes').insertOne({ name, ingredients, preparation, userId })))
    .then(({ insertedId }) => ({
      recipe: {
        _id: insertedId,
        name,
        ingredients,
        preparation,
        userId,
      },
    }))
);

const getRecipeById = async (id) => (
  connect()
    .then((db) => (
      db.collection('recipes').findOne(ObjectId(id))))
);

const updateRecipe = async (id, name, ingredients, preparation, userId) => (
  connect()
    .then((db) => (
      db.collection('recipes')
        .updateOne({ _id: ObjectId(id) }, { $set: { name, ingredients, preparation } }))
      .then(() => ({ _id: id, name, ingredients, preparation, userId })))
);

const deleteRecipe = async (id) => (
  connect()
    .then((db) => (
      db.collection('recipes').deleteOne({ _id: ObjectId(id) })))
);

const updateRecipeImage = async (id, name, ingredients, preparation, userId, image) => (
  connect()
    .then((db) => (
      db.collection('recipes')
        .updateOne({ _id: ObjectId(id) }, { $set: { image } }))
      .then(() => ({ _id: id, name, ingredients, preparation, userId, image })))
);

module.exports = {
  getAllRecipes,
  createRecipe,
  getRecipeById,
  updateRecipe,
  deleteRecipe,
  updateRecipeImage,
};
