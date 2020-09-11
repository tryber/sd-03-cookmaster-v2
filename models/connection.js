require('dotenv').config();
const { MongoClient } = require('mongodb');

const { MONGO_DB_URL, DB_NAME } = process.env;

console.log(`enviromental variables are: ${MONGO_DB_URL}, ${DB_NAME}`);

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
