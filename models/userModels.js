const connection = require('./connection');

const createUser = async (name, email, password, role = 'user') => {
  try {
    const connect = await connection();
    const dbCollection = connect.collection('users');
    const userRegister = await dbCollection.insertOne({ name, email, password, role });
    const { insertedId: _id } = userRegister;
    return { _id, name, email, role };
  } catch (error) {
    throw new Error('user register failed');
  }
};

const findUserByEmail = async (email) => {
  try {
    const connect = await connection();
    const dbCollection = connect.collection('users');
    const searchQuery = await dbCollection.findOne({ email });

    return searchQuery;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = { createUser, findUserByEmail };
