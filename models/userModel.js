const { ObjectId } = require('mongodb');
const connection = require('./connect');

const getUserByEmail = async (email) =>
  connection().then((db) => db.collection('users').findOne({ email }));

const getUserById = async (id) =>
  connection().then((db) => db.collection('users').findOne(ObjectId(id)));

const registerUser = async (name, email, password) =>
  connection()
    .then((db) => db.collection('users').insertOne({ name, email, password, role: 'user' }))
    .then(({ insertedId }) => ({ user: { name, email, password, role: 'user', _id: insertedId } }));

module.exports = {
  getUserByEmail,
  getUserById,
  registerUser,
};
