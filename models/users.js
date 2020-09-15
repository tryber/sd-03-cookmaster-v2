const { connect } = require('./connection');

const setNewUser = async (name, email, password) =>
  connect()
    .then((db) => db.collection('users').insertOne({ name, email, password, role: 'user' }))
    .then(({ insertedId }) => ({ user: { name, email, password, role: 'user', _id: insertedId } }));

const findUserByEmail = async (email) =>
  connect()
    .then((db) => db.collection('users').findOne({ email }));

const setNewAdmin = async (name, email, password) =>
  connect()
    .then((db) => db.collection('users').insertOne({ name, email, password, role: 'admin' }))
    .then(({ insertedId }) => ({ user: { name, email, password, role: 'admin', _id: insertedId } }));

module.exports = {
  setNewUser,
  findUserByEmail,
  setNewAdmin,
};
