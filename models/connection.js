const { MongoClient } = require('mongodb');

const { MONGO_DB_URL = 'mongodb://mongodb:27017/Cookmaster', DB_NAME = 'Cookmaster' } = process.env;

module.exports = async () => {
  try {
    const connection = await MongoClient.connect(MONGO_DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    const dbase = connection.db(DB_NAME);
    return dbase;
  } catch (error) {
    throw new Error('connection refused');
  }
};
