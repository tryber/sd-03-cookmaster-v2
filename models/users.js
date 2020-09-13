const { connect } = require('./connection');

const setNewUser = async (name, email, password) =>
  connect()
    .then((db) => db.collection('users').insertOne({ name, email, password, role: 'user' }))
    .then(({ insertedId }) => ({ user: { name, email, password, role: 'user', _id: insertedId } }));

const findUserByEmail = async (email) =>
  connect()
    .then((db) => db.collection('users').findOne({ email }));

module.exports = {
  setNewUser,
  findUserByEmail,
};
