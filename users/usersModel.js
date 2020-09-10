const connection = require('../models/connection');
// const { ObjectID } = require('mongodb');

const addUser = async (name, email, password, role) => {
  const db = await connection();
  return db.collection('users').insertOne({ name, email, password, role });
};

module.exports = { addUser };
