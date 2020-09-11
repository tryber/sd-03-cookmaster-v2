const { ObjectId } = require('mongodb');
const connection = require('./connection');

const createUser = async (name, email, password, role) =>
  connection()
    .then((db) => db
      .collection('users')
      .insertOne({ name, email, password }))
    .then(({ insertedId }) => ({ _id: ObjectId(insertedId), email, password, role }))
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

const getUserById = async (id) =>
  connection()
    .then((db) => db
      .collection('users')
      .findOne(ObjectId(id)))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });

module.exports = {
  createUser,
  getUserByEmail,
  getUserById,
};
