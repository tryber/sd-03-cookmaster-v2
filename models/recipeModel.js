const { ObjectId } = require('mongodb');
const { connect } = require('./connection');

const createRecipe = async (name, ingredients, preparation, userId) => connect()
  .then((db) => db.collection('recipes').insertOne({ name, ingredients, preparation, userId }))
  .then(({ insertedId }) => ({
    recipe: {
      name,
      ingredients,
      preparation,
      userId,
      _id: insertedId,
    },
  }));

const getAllRecipes = async () => connect()
  .then((db) => db.collection('recipes').find({}).toArray());

const getRecipeById = async (id) => connect()
  .then((db) => db.collection('recipes').findOne(ObjectId(id)));

const updateRecipe = async (id, { name, ingredients, preparation, userId }) => connect()
  .then((db) => db.collection('recipes')
    .updateOne({ _id: ObjectId(id) }, { $set: { name, ingredients, preparation } }))
  .then(() => ({ _id: id, name, ingredients, preparation, userId }));

const deleteRecipe = async (id, userId) => connect()
  .then((db) => db.collection('recipes').deleteOne({ _id: ObjectId(id), userId }));

const uploadRecipeImage = async (id, image, actualRecipe) => connect()
  .then((db) => db.collection('recipes')
    .updateOne({ _id: ObjectId(id) }, { $set: { image } }))
  .then(() => ({ ...actualRecipe, image }));

module.exports = {
  createRecipe,
  getAllRecipes,
  getRecipeById,
  updateRecipe,
  deleteRecipe,
  uploadRecipeImage,
};
