const connection = require('./connection');

const createUser = async (name, email, password) => connection()
  .then((db) => db.collection('users').insertOne({ name, email, password, role: 'user' }))
  .then(({ insertedId }) => ({ _id: insertedId, name, email, password, role: 'user' }));

const getUserByEmail = async (email) => connection()
  .then((db) => db.collection('users').findOne({ email }))
  .then((user) => user);

module.exports = {
  createUser,
  getUserByEmail,
};
