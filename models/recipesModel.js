const connect = require('./connection');
const { ObjectId } = require('mongodb');

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

const updateRecipe = async (id, name, ingredients, preparation) =>
  connect().then((db) =>
    db.collection('recipes').updateOne({ _id: id }, { $set: { name, ingredients, preparation } }),
  );

const deleteRecipe = async (id) =>
  connect().then((db) => db.collection('recipes').deleteOne({ _id: ObjectId(id) }));

const updateRecipeImage = async (id, path) =>
  connect()
    .then((db) =>
      db.collection('recipes').updateOne({ _id: id }, { $set: { image: `${path}${id}.jpeg` } }),
    )
    .then(() => `${path}${id}.jpeg`);

module.exports = {
  createRecipe,
  findAllRecipes,
  findRecipeById,
  updateRecipe,
  deleteRecipe,
  updateRecipeImage,
};
