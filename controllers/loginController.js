// service
const { LogUser } = require('../services/userServices');

const login = async (req, res) => {
  const { email, password } = req.body;
  const { ok, status, message, token } = await LogUser(email, password);
  return ok
    ? res.status(status).json({ token })
    : res.status(status).json({ message });
};

module.exports = { login };
