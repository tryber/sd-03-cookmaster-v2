const connect = require('./connection');

const insert = async (userData) => {
  try {
    const db = await connect();
    const response = await db.collection('users').insertOne(userData);
    const { name, email, role } = userData;
    return {
      name,
      email,
      role,
      _id: response.insertedId,
    };
  } catch (err) {
    throw new Error(err);
  }
};

const findByEmail = async (email) => {
  try {
    const db = await connect();
    const response = await db.collection('users').findOne({ email });
    return response;
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = {
  insert,
  findByEmail,
};
