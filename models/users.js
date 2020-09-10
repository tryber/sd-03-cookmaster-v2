const connectTo = require('./connect');

const getUser = async (userObj) => connectTo('users').then((table) => table.findOne(userObj));

const add = async ({ name, email, password, role }) => connectTo('users')
  .then((table) => table.insertOne({ name, email, password, role }))
  .then(({ insertedId }) => ({ _id: insertedId, name, email, password, role }));

module.exports = {
  getUser,
  add,
};
