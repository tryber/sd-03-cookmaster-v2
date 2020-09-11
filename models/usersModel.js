const connect = require('./connection');

const createUser = async (name, email, password) => {
  const db = await connect();
  let newUser = await db.collection('users')
    .insertOne({
      name,
      email,
      password,
      role: 'user',
    });
  const { insertedId } = newUser;
  newUser = {
    user: {
      _id: insertedId,
      name,
      email,
      password,
      role: 'user',
    },
  };
  return newUser;
};

const getUserByEmail = async (email) => {
  const db = await connect();
  const user = await db.collection('users').findOne({ email });
  return user;
};

module.exports = {
  createUser,
  getUserByEmail,
};
