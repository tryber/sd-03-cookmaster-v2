const connection = require('../utils/connection');
// const { ObjectID } = require('mongodb');

const addRecipe = async (name, ingredients, preparation) => {
  const db = await connection();
  return db.collection('recipes').insertOne({ name, ingredients, preparation });
};

const getAllRecipes = async () =>
  connection().then((db) => db.collection('recipes').find({}).toArray());

module.exports = { addRecipe, getAllRecipes };
