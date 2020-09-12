const { MongoClient } = require('mongodb');

const connect = () => MongoClient.connect('mongodb://mongodb:27017/Cookmaster', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then((connection) => connection.db('Cookmaster'));

module.exports = {
  connect,
};
