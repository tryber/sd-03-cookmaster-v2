const connection = require('./connection');

const getUser = async (userObj) =>
  connection()
    .then((db) => db.collection('users'))
    .then((table) => table.findOne(userObj));

module.exports = getUser;
