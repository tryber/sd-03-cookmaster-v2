const { connect } = require('./DbConnection');

const createUserModel = async ({ name, email, password }) => {
  let result = '';
  let user = '';
  const db = await connect();

  result = await db.collection('users').insertOne({
    name,
    email,
    password,
    role: 'user',
  });
  const listUser = result.ops[0];
  user = { user: listUser };
  return user;
};

const searchByEmail = async (email) => {
  const db = await connect();
  const result = await db.collection('users').findOne({ email: email });
  return result;
};

module.exports = {
  createUserModel,
  searchByEmail,
};
