const { connect } = require('./DbConnection');


const createUserModel = async ({ name, email, password }) => {
  let result = '';
  let user = '';
  const db = await connect();

  result = await db.collection('user').insertOne({
    name,
    email,
    password,
    role:'user',
  });
  const listUser = result.ops[0];
  user = { user: listUser };
  return user;
};

const searchByEmail =  async (email) => {
  const db = await connect();
  result = await db.collection('user').findOne({email:email});
  return result.email;
}

module.exports = {
  createUserModel,
  searchByEmail,
};
