const service = require('./userService');

const registerUser = async (req, res) => {
  try {
    const { body } = req;
    const user = await service.createUser(body);
    return res.status(200).json(user);
  } catch (err) {
    console.log(err);
  }
};

module.exports = { registerUser };
