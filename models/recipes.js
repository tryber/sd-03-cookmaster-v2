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

module.exports = {
  createRecipe,
  getAllRecipes,
  getRecipeById,
};
