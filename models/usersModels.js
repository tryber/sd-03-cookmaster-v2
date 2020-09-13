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

const insertAdmin = async ({ name, email, password, newUserRole }) => {
  const db = await connect();
  const newUser = await db.collection('users')
    .insertOne({ name, email, password, role: newUserRole });

  return { user: newUser.ops[0] };
};

module.exports = {
  insertUser,
  getUserWithEmail,
  insertAdmin,
};
