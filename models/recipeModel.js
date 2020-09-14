const { ObjectId } = require('mongodb');
const connection = require('./connection');

const getAllRecipes = async () => {
  const db = await connection();
  const recipes = await db.collection('recipes').find().toArray();
  return recipes;
};

const getRecipeById = async (id) => {
  const db = await connection();
  if (!ObjectId.isValid(id)) return null;
  const recipe = await db.collection('recipes').findOne({ _id: ObjectId(id) });
  return recipe;
};

const registerNewRecipe = async (newRecipeData) => {
  const db = await connection();
  const newRecipe = await db.collection('recipes').insertOne(newRecipeData);
  return newRecipe.ops[0];
};

const updateRecipe = async ({ name, ingredients, preparation, recipeId }) =>
  connection()
    .then((db) => db
      .collection('recipes')
      .findOneAndUpdate(
        { _id: ObjectId(recipeId) },
        { $set: { name, ingredients, preparation } },
        { returnOriginal: false },
      ))
    .then(({ value }) => value)
    .catch((e) => e);

const deleteRecipe = (id) =>
  connection()
    .then((db) => db.collection('recipes').findOneAndDelete({ _id: ObjectId(id) }))
    .then(({ value }) => value)
    .catch((e) => e);

const insertRecipeImage = ({ id, filename }) =>
  connection()
    .then((db) => db
      .collection('recipes')
      .findOneAndUpdate(
        { _id: ObjectId(id) },
        { $set: { image: `localhost:3000/images/${filename}` } },
        { returnOriginal: false },
      ))
    .then(({ value }) => value)
    .catch((e) => e);

module.exports = {
  getAllRecipes,
  getRecipeById,
  registerNewRecipe,
  updateRecipe,
  deleteRecipe,
  insertRecipeImage,
};
