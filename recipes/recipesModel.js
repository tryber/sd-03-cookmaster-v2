const { ObjectID } = require('mongodb');
const connection = require('../utils/connection');

const addRecipe = async (name, ingredients, preparation) => {
  const db = await connection();
  return db.collection('recipes').insertOne({ name, ingredients, preparation });
};

const getAllRecipes = async () =>
  connection().then((db) => db.collection('recipes').find({}).toArray());

const getRecipeById = async (id) =>
  connection().then((db) => db.collection('recipes').findOne(ObjectID(id)));

module.exports = { addRecipe, getAllRecipes, getRecipeById };
