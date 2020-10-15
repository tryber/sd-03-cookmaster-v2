require('dotenv').config();
const mongo = require('mongodb').MongoClient;

const { MONGO_DB_URL, DB_NAME } = process.env;
const url = 'mongodb://localhost:27017/Cookmaster';
const dbName = 'Cookmaster';

module.exports = () => mongo.connect(MONGO_DB_URL || url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then((connect) => connect.db(DB_NAME || dbName))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
