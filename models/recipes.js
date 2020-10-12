const { ObjectId } = require('mongodb');

const connect = require('./connection');

const createRecipe = async ({ name, ingredients, preparation, userId }) => connect()
  .then((db) => db
    .collection('recipes')
    .insertOne({ name, ingredients, preparation, userId }))
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
  .then((db) => db
    .collection('recipes')
    .find({})
    .toArray());

const getRecipeById = async (id) => connect()
  .then((db) => (ObjectId.isValid(id)
    ? db.collection('recipes').findOne({ _id: ObjectId(id) })
    : null));

const editRecipe = async ({ id, name, ingredients, preparation, userId }) => connect()
  .then((db) => (ObjectId.isValid(id)
    ? db
      .collection('recipes')
      .updateOne({ _id: ObjectId(id) }, { $set: { name, ingredients, preparation } })
    .then(() => ({
      _id: id,
      name,
      ingredients,
      preparation,
      userId,
    })) : null));

const deleteRecipe = async (id) => connect()
  .then((db) => (ObjectId.isValid(id)
    ? db
      .collection('recipes')
      .deleteOne({ _id: ObjectId(id) })
    : null));

module.exports = {
  editRecipe,
  createRecipe,
  deleteRecipe,
  getAllRecipes,
  getRecipeById,
};
