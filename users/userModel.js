const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, require: true },
  password: { type: String, require: true },
  email: { type: String/* , unique: true */, required: true },
  role: {
    type: String,
    default: 'user',
  },
});

const User = mongoose.model('User', userSchema);

const createUser = async (data) => {
  const user = new User(data);
  user.save();
  return user;
};

const findUser = async (value, field) =>
  User.findOne({ [field]: value }).exec();

module.exports = { createUser, findUser };

// const userSchema = new mongoose.Schema({
//   name: String,
//   email: String,
//   password: String,
//   role: String,

// });
