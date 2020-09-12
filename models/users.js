const { connect } = require('./connection');

const setNewUser = async (name, email, password) =>
  connect()
    .then((db) => db.collection('users').insertOne({ user: { name, email, password, role: 'user' } }))
    .then(({ insertedId }) => ({ user: { name, email, password, role: 'user', _id: insertedId } }));

const findUserByEmail = async (email) =>
  connect()
    .then((db) => db.collection('users').findOne({ 'user.email': email }))
    .then(({ user }) => ({ user }));

module.exports = {
  setNewUser,
  findUserByEmail,
};
