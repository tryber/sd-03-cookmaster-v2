const { ObjectId } = require('mongodb');
const mongo = require('./connection');

const createUser = async (name, email, password) => mongo.connect()
  .then((db) => db.collection('users')
  .insertOne({ name, email, password, role: 'user' }))
  .then(({ insertedId }) => ({ user: { _id: insertedId, name, email, password, role: 'user' } }))
  .catch((error) => error);

const getUserByEmail = async (email) => mongo.connect()
  .then((db) => db.collection('users')
    .findOne({ email }),
  )
  .catch((error) => error);

const createRecipe = async (name, ingredients, preparation, userId) =>
  mongo.connect()
  .then((db) => db.collection('recipes')
  .insertOne({ name, ingredients, preparation, userId }))
  .then(({ insertedId }) =>
    ({ recipe: { name, ingredients, preparation, userId, _id: insertedId } }),
  )
  .catch((error) => error);

const getAllRecipesFromDB = async () => mongo.connect()
  .then((db) => db.collection('recipes')
  .find({})
  .toArray())
  .catch((error) => error);

const getRecipeFromDB = async (id) => mongo.connect()
  .then((db) => db.collection('recipes')
    .findOne(ObjectId(id)),
  )
  .catch((error) => error);

const updateRecipe = async (id, name, ingredients, preparation) =>
  mongo.connect()
  .then((db) => db.collection('recipes')
  .updateOne({ _id: ObjectId(id) }, { $set: { name, ingredients, preparation } }),
  )
  .then(() => ({ name, ingredients, preparation }))
  .catch((error) => error);


module.exports = {
  createUser,
  getUserByEmail,
  createRecipe,
  getAllRecipesFromDB,
  getRecipeFromDB,
  updateRecipe,
};
