const { ObjectId } = require('mongodb');
const connection = require('./connect');

const getAllRecipes = async () => connection().then((db) => db.collection('recipes').find({}).toArray());

const getRecipeById = async (id) =>
  connection().then((db) => db.collection('recipes').findOne(ObjectId(id)));

const createRecipe = async (name, ingredients, preparation, userId) =>
  connection().then((db) =>
    db
      .collection('recipes')
      .insertOne({ name, ingredients, preparation, userId })
      .then(({ insertedId }) => ({
        name,
        ingredients,
        preparation,
        userId,
        _id: insertedId,
      })),
  );

const editRecipe = async (id, name, ingredients, preparation, userId) =>
  connection()
    .then((db) =>
      db
        .collection('recipes')
        .updateOne({ _id: ObjectId(id) }, { $set: { name, ingredients, preparation } }),
    )
    .then(() => ({
      _id: id,
      name,
      ingredients,
      preparation,
      userId,
    }));

module.exports = {
  createRecipe,
  getAllRecipes,
  getRecipeById,
  editRecipe,
};
