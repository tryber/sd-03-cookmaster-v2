const { MongoClient } = require('mongodb');

// const MONGO_DB_URL = 'mongodb://localhost:27017/CookmasterV2';
const MONGO_DB_URL = 'mongodb://mongodb:27017/CookmasterV2';
const DB_NAME = 'CookmasterV2';

const connect = () => MongoClient.connect(MONGO_DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then((connection) => connection.db(DB_NAME))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });

module.exports = {
  connect,
};
