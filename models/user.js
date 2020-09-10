const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  role: String,

});

const User = mongoose.model('User', userSchema);

async function getUser(data, property = 'id') {
  if (property === 'id') {
    return User.findById(data);
  }
  return User.find({ [property]: data }).exec();
}

async function createUser(data) {
  const user = new User(data);

  return user.save();
}

module.exports = { createUser, getUser };
