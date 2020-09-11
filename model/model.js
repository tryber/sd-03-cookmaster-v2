const { ObjectId } = require('mongodb');
const connection = require('./connection');

const getUserByEmail = (email) =>
  connection()
    .then((db) =>
      db.collection('users')
        .findOne({ email }));

const createUser = ({ name, email, password }) =>
  connection()
    .then((db) =>
      db.collection('users')
        .insertOne({ name, email, password, role: 'user' }))
    .then(({ insertedId }) => ({ _id: insertedId, name, email, password, role: 'user' }));

const showAllUsers = () =>
  connection()
    .then((db) =>
      db.collection('users')
        .find({}).toArray())
    .then((users) => users);

const createRecipe = ({ name, ingredients, preparation }, userId) =>
  connection()
    .then((db) =>
      db.collection('recipes')
        .insertOne({ name, ingredients, preparation, userId }))
    .then(({ insertedId }) => ({ _id: insertedId, name, ingredients, preparation, userId }));

const getAllRecipes = () =>
  connection()
    .then((db) =>
      db.collection('recipes')
        .find({}).toArray())
    .then((recipes) => recipes);

const getRecipe = (id) =>
  connection()
    .then((db) =>
      db.collection('recipes')
        .findOne(ObjectId(id)))
    .then((recipe) => recipe);

const updateRecipe = ({ name, ingredients, preparation }, id) =>
  connection()
    .then((db) =>
      db.collection('recipes')
        .updateOne({ _id: ObjectId(id) }, { $set: { name, ingredients, preparation } }));

const deleteRecipe = (id) =>
  connection()
    .then((db) => db.collection('recipes')
      .deleteOne({ _id: ObjectId(id) }));

const uploadImage = (id, extension) =>
  connection()
    .then((db) =>
      db.collection('recipes')
        .updateOne({ _id: ObjectId(id) }, { $set: { image: `localhost:3000/images/${id}.${extension}` } }));

const createAdmin = ({ name, email, password }) =>
  connection()
    .then((db) =>
      db.collection('users')
        .insertOne({ name, email, password, role: 'admin' }))
    .then(({ insertedId }) => ({ _id: insertedId, name, email, password, role: 'admin' }));

module.exports = {
  getUserByEmail,
  createUser,
  showAllUsers,
  createRecipe,
  getAllRecipes,
  getRecipe,
  updateRecipe,
  deleteRecipe,
  uploadImage,
  createAdmin,
};
