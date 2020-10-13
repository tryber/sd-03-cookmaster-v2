const connect = require('./connection');

const createUser = async ({ name, email, password }) => connect()
  .then((db) => db
    .collection('users')
    .insertOne({ name, email, password }))
  .then(({ insertedId }) => ({
    user: {
      name,
      email,
      role: 'user',
      insertedId,
    },
  }));

const createAdmin = async ({ name, email, password }) => connect()
  .then((db) => db
    .collection('users')
    .insertOne({ name, email, password }))
  .then(({ insertedId }) => ({
    user: {
      name,
      email,
      role: 'admin',
      insertedId,
    },
  }));

const userByEmail = async (email) => connect()
  .then((db) => db
    .collection('users')
    .findOne({ email }));

module.exports = {
  createUser,
  createAdmin,
  userByEmail,
};
