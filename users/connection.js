require('dotenv').config();
const { MongoClient } = require('mongodb');

const MONGO_DB_URL = process.env.MONGO_DB_URL ? process.env.MONGO_DB_URL : 'mongodb://mongodb:27017/Cookmaster';
const DB_NAME = process.env.DB_NAME ? process.env.DB_NAME : 'Cookmaster';

module.exports = () =>
  MongoClient.connect(MONGO_DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((conect) => conect.db(DB_NAME))
    .catch((err) => console.error(err));
