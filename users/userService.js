const Model = require('./userModel');

const createUser = async (data) => {
  await Model.createUser(data);
  console.log(data);
};
module.exports = { createUser };
