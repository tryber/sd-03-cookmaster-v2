const { connect } = require('./connection');

const createUser = async (name, email, password) => connect()
  .then((db) => db.collection('users').insertOne({ name, email, password }))
  .then(({ insertedId }) => ({
    user: {
      name,
      email,
      role: 'user',
      _id: insertedId,
    },
  }));

module.exports = {
  createUser,
};
