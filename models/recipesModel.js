const connect = require('./connection');
const { ObjectId } = require('mongodb');
const recipe = require('../controllers/recipesController');

const createRecipe = async (name, ingredients, preparation, userId) =>
  connect()
    .then((db) =>
      db
        .collection('recipes')
        .insertOne({ name, ingredients, preparation, userId: ObjectId(userId) }),
    )
    .then(({ insertedId }) => ({
      _id: insertedId,
      name,
      ingredients,
      preparation,
      userId: ObjectId(userId),
    }));

const findAllRecipes = async () =>
  connect().then((db) => db.collection('recipes').find({}).toArray());

const findRecipeById = async (id) =>
  connect().then((db) => db.collection('recipes').findOne(ObjectId(id)));

module.exports = { createRecipe, findAllRecipes, findRecipeById };
