const { ObjectId } = require('mongodb');
const connect = require('./connection');

const createUser = async (name, email, password, role) =>
  connect()
    .then((db) => db.collection('users').insertOne({ name, email, password, role }))
    .then(({ insertedId }) => ({ _id: insertedId, name, email, password, role }))
    .catch((err) => err);

const findUserByEmail = async (email) =>
  connect().then((db) => db.collection('users').findOne({ email }));

const finUserById = async (id) =>
  connect().then((db) => db.collection('users').findOne(ObjectId(id)));

module.exports = { createUser, findUserByEmail, finUserById };
