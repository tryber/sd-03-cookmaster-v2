const service = require('./userService');
const Model = require('./userModel');

const registerUser = async (req, res, next) => {
  try {
    const { body } = req;
    const user = await service.createUser(body);
    return res.status(201).json({ user });
  } catch (err) {
    console.log('register error', err);
    next(err);
  }
};

const login = async (req, res, next) => {
  try {
    const { body } = req;
    const user = await Model.findUser(body.email, 'email');
    const token = await service.createToken(JSON.stringify(user));
    return res.status(200).json({ token });
  } catch (err) {
    console.log('register error', err);
    next(err);
  }
};

module.exports = { registerUser, login };
