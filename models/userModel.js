const { ObjectId } = require('mongodb');
const connection = require('./connection');

const createUser = async (name, email, password, role) =>
  connection()
    .then((db) => db
      .collection('users')
      .insertOne({ name, email, password }))
    .then(({ insertedId }) => ({ user: { name, email, role, _id: ObjectId(insertedId) } }))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });

const getUserByEmail = async (email) =>
  connection()
    .then((db) => db
      .collection('users')
      .findOne({ email }))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });

module.exports = {
  createUser,
  getUserByEmail,
};
