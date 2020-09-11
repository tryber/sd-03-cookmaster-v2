const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { type: String, require: true, min: 5 },
  password: { type: String, require: true },
  email: { type: String, unique: true },
  role: {
    type: String,
    default: 'user',
  },
});
const User = mongoose.model('User', UserSchema);

const createUser = async (data) => {
  console.log('data:', data);
  const user = new User(data);
  console.log('user:', user);
  return user.save();
};

const findUser = async (data, field = 'id') => {
  const user = User.find({ [field]: data });
  return user;
};

module.exports = { createUser, findUser };
