const { ObjectId } = require('mongodb');
const connect = require('./connect');

const getAll = async () =>
  connect().then((db) => db.collection('users').find({}).toArray());

const getUsersById = async (id) =>
  connect().then((db) => db.collection('users').findOne(ObjectId(id)));

const getUserByEmail = async (email) =>
  connect().then((db) => db.collection('users').findOne({ email }));

const add = ({ name, email, password, role }) =>
  connect()
    .then((db) => db.collection('users').insertOne({ name, email, password, role }))
    .then(({ insertedId }) => ({ name, email, role, _id: insertedId }));

module.exports = {
  getAll,
  getUsersById,
  getUserByEmail,
  add,
};
