const connect = require('./connect');

const insertUser = async (user) => {
  const db = await connect();
  const insertedUser = await db.collection('users').insertOne(user);
  return insertedUser.ops[0];
};

const getUserWithEmail = async (email) => {
  const db = await connect();
  const emailExists = await db.collection('users').findOne({ email });
  return emailExists;
};

module.exports = {
  insertUser,
  getUserWithEmail,
};
