const { ObjectId } = require('mongodb');

const { connect } = require('./connect');

const getAllUsers = async () => (
  connect().then((db) => (db).collection('users').find({}).toArray())
);

const createUser = async (name, email, password, role = 'user') => (
  connect()
    .then((db) => (
      db.collection('users').insert({ name, email, password, role })))
    .then(({ insertedId }) => ({
      user: {
        _id: insertedId,
        name,
        email,
        password,
        role,
      },
    }))
);

const getUserById = async (id) => (
  connect()
    .then((db) => (
      db.collection('users').find(ObjectId(id))))
);

module.exports = {
  getAllUsers,
  createUser,
  getUserById,
};
