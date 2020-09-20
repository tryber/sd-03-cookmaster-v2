const { ObjectId } = require('mongodb');
const connection = require('./connect');

const getUserByEmail = async (email) =>
  connection().then((db) => db.collection('users').findOne({ email }));

const getUserById = async (id) =>
  connection().then((db) => db.collection('users').findOne(ObjectId(id)));

const registerUser = async (name, email, password, role = 'user') =>
  connection()
    .then((db) => db.collection('users').insertOne({ name, email, password, role }))
    .then(({ insertedId }) => ({ user: { name, email, password, role, _id: insertedId } }));

const registerAdminUser = async (name, email, password) =>
  connection()
    .then((db) => db.collection('users').insertOne({ name, email, password, role: 'admin' }))
    .then(({ insertedId }) => ({
      user: { name, email, password, role: 'admin', _id: insertedId },
    }));

module.exports = {
  getUserByEmail,
  getUserById,
  registerUser,
  registerAdminUser,
};
