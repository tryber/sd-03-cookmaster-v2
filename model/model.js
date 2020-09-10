// const { ObjectId } = require('mongodb');
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

module.exports = {
  createUser,
  getUserByEmail,
};
