const connection = require('../models/connection');
// const { ObjectID } = require('mongodb');

const addRecipe = async (name, ingredients, preparation) => {
  const db = await connection();
  return db.collection('recipes').insertOne({ name, ingredients, preparation });
};

module.exports = { addRecipe };
