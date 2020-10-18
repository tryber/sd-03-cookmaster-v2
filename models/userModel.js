const { ObjectId } = require('mongodb');
const { connect } = require('./connection');

const createUser = async (name, email, password) => connect()
  .then((db) => db.collection('users').insertOne({ name, email, password, role: 'user' }))
  .then(({ insertedId }) => ({
    user: {
      name,
      email,
      role: 'user',
      _id: insertedId,
    },
  }));

const getUserByEmail = async (email) => connect()
  .then((db) => db.collection('users').findOne({ email }));

const getUserById = async (id) => connect()
  .then((db) => db.collection('users').findOne(ObjectId(id)));

const createUserAdmin = async (name, email, password) => connect()
  .then((db) => db.collection('users').insertOne({ name, email, password, role: 'admin' }))
  .then(({ insertedId }) => ({
    user: {
      name,
      email,
      role: 'admin',
      _id: insertedId,
    },
  }));

module.exports = {
  createUser,
  getUserByEmail,
  getUserById,
  createUserAdmin,
};
