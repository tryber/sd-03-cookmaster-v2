const connect = require('./connection');

const registerUsers = async (name, email, password, role) => connect()
  .then((db) => db.collection('users').insertOne({ name, email, password, role }))
  .then(({ insertedId }) => ({ _id: insertedId, name, email, password, role }))
  .catch((err) => err);

const checkEmail = async (email) => connect()
  .then((db) => db.collection('users').findOne({ email }));

const checkPassowrd = async (password) => connect()
  .then((db) => db.collection('users').findOne({ password }))
  .catch((err) => err);

// const getUsers = async () =>

module.exports = {
  registerUsers,
  checkEmail,
  checkPassowrd,
};
