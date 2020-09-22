const { ObjectId } = require('mongodb');
const connection = require('./connection');

const createRecipe = (id, name, ingredients, preparation) => connection()
  .then((db) => db.collection('recipes').insertOne({ name, ingredients, preparation, userId: id }))
  .then(({ insertedId }) => ({ _id: insertedId, name, ingredients, preparation, userId: id }));

const getAllRecipes = () => connection()
  .then((db) => db.collection('recipes').find().toArray());

const getRecipeById = (id) => connection()
  .then((db) => db.collection('recipes').findOne(ObjectId(id)));

module.exports = {
  createRecipe,
  getAllRecipes,
  getRecipeById,
};
