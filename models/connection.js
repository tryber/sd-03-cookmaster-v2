const { MongoClient } = require('mongodb');

const MONGO_DB_URL = 'mongodb://mongodb:27017/Cookmaster';
const DB_NAME = 'Cookmaster';

let connection;

module.exports = () => {
  if (connection) return Promise.resolve(connection);
  return MongoClient.connect(MONGO_DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
    .then((conn) => {
      connection = conn.db(DB_NAME);
      return connection;
    })
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });
};
