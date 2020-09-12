const connect = require('./connection');

const createUser = async (name, email, password, role) =>
  connect()
    .then((db) => db.collection('users').insertOne({ name, email, password, role }))
    .then(({ insertedId }) => ({ _id: insertedId, name, email, password, role }))
    .catch((err) => err);

const findUserByEmail = async (email) =>
  connect().then((db) => db.collection('users').findOne({ email }));

module.exports = { createUser, findUserByEmail };
