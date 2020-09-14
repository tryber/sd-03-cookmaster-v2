const connect = require('./connect');
const { ObjectId } = require('mongodb');

const insert = async (user) => connect()
  .then((db) => 
    db
    .collection('users')
    .insertOne({ ...user, role: 'user'}))
    .then(({ insertedId }) => ({ user: { ...user, _id: insertedId } }));

const findById = async (id) => connect()
  .then((db) =>
    db
    .collection('users')
    .findOne(ObjectId(id))
  );

const findByEmail = async (email) => connect()
  .then((db) =>
    db
    .collection('users')
    .find({ email })
    .toArray(),
  );

module.exports = {
  insert,
  findById,
  findByEmail,
};
