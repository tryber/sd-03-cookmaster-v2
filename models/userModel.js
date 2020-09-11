const connect = require('./connection');

const createUser = async (name, email, password, user) =>
  connect()
    .then((db) => db.collection('users').insertOne({ name, email, password, user }))
    .then(({ insertedId }) => ({ _id: insertedId, name, email, password, user }))
    .catch((err) => err);

module.exports = { createUser };
