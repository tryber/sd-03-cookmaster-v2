const { ObjectID } = require('mongodb');
const connection = require('../utils/connection');

const addRecipe = async (name, ingredients, preparation, userId) => {
  const db = await connection();
  return db.collection('recipes').insertOne({ name, ingredients, preparation, userId });
};

const getAllRecipes = async () =>
  connection().then((db) => db.collection('recipes').find({}).toArray());

const getRecipeById = async (id) =>
  connection().then((db) => db.collection('recipes').findOne(ObjectID(id)));

const editRecipe = async (id, name, ingredients, preparation) => {
  const db = await connection();
  return db
    .collection('recipes')
    .updateOne({ _id: ObjectID(id) }, { $set: { name, ingredients, preparation } });
};

const deleteRecipe = async (id) => {
  const db = await connection();
  const { value } = await db.collection('recipes').findOneAndDelete({ _id: ObjectID(id) });
  return value;
};

module.exports = { addRecipe, getAllRecipes, getRecipeById, editRecipe, deleteRecipe };
