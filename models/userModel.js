const { connect } = require('./connect');
const { ObjectId } = require('mongodb');

const add = async (name, email, password, role = 'user') => {
  const db = await connect();

  const { insertedId } = await db.collection('users').insertOne({ name, email, password, role });

  return { user: { name, email, role, _id: insertedId } };
};

const findByEmail = async (email) => {
  const db = await connect();

  const user = await db.collection('users').findOne({ email });

  return user;
};

const findById = async (id) => {
  const db = await connect();

  const user = await db.collection('users').findOne(ObjectId(id));

  return user;
};

module.exports = {
  add,
  findByEmail,
  findById,
};
