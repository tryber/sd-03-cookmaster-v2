const { connect } = require('./DbConnection');

const createUserModel = async ({ name, email, password }) => {
  let result = '';
  let user = '';
  const db = await connect();

  result = await db.collection('user').insertOne({
    name,
    email,
    password,
  });
  const listUser = result.ops[0];
  user = { user: listUser };
  return user;
};
module.exports = {
  createUserModel,
};
