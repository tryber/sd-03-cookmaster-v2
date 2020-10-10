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

const userByEmail = async (userEmail) => connect()
  .then((db) => db
    .collection('users')
    .findOne({ email: userEmail }));

module.exports = {
  createUser,
  userByEmail,
};
