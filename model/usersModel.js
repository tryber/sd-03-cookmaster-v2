const connect = require('./connect');
const { ObjectId } = require('mongodb');

const insertUser = async (user, role) => connect()
  .then((db) =>
    db
    .collection('users')
    .insertOne({ ...user, role }))
    .then(({ insertedId }) => ({ user: { ...user, role, _id: insertedId } }));

const findById = async (id) => connect()
  .then((db) =>
    db
    .collection('users')
    .findOne(ObjectId(id)),
  );

const findByEmail = async (email) => connect()
  .then((db) =>
    db
    .collection('users')
    .findOne({ email }),
  );

module.exports = {
  insertUser,
  findById,
  findByEmail,
};
