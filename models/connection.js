require('dotenv').config();
const { MongoClient } = require('mongodb');

const { MONGO_DB_URL, DB_NAME } = process.env;

module.exports = () =>
  MongoClient.connect(MONGO_DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
    .then((connection) => connection.db(DB_NAME))
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });
