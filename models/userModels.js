const { ObjectID } = require('mongodb');
const connection = require('./connection');

const createUser = async (name, email, password, role = 'user') => {
  try {
    const connect = await connection('users');
    const userRegister = await connect.insertOne({ name, email, password, role });
    const { insertedId: _id } = userRegister;
    return { _id, name, email, role };
  } catch (error) {
    throw new Error('user register failed');
  }
};

const findUserByEmail = async (email) => {
  try {
    const connect = await connection('users');
    const searchQuery = await connect.findOne({ email });

    return searchQuery;
  } catch (error) {
    throw new Error(error.message);
  }
};

const findUserById = async (id) => {
  try {
    const connect = await connection('users');
    const searchQuery = await connect.findOne({ _id: ObjectID(id) });

    return searchQuery;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = { createUser, findUserByEmail, findUserById };
