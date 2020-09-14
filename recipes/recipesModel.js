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

const editRecipe = async (id, recipeData) => {
  const db = await connection();
  return db
    .collection('recipes')
    .updateOne({ _id: ObjectID(id) }, { $set: recipeData });
};

const deleteRecipe = async (id) => {
  const db = await connection();
  return db.collection('recipes').deleteOne({ _id: ObjectID(id) });
};

module.exports = { addRecipe, getAllRecipes, getRecipeById, editRecipe, deleteRecipe };
