const connect = require('./connect');

const insertUser = async (user) => {
  const db = await connect();
  const insertedUser = db.insertOne({ user });
  return insertedUser;
};

const getEmail = async (email) => {
  const db = await connect();
  const emailExists = await db.findOne({ email });
  return emailExists;
};

module.exports = {
  insertUser,
  getEmail,
};
