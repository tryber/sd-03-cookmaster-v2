const services = require('../services');
const jwt = require('jsonwebtoken');

const createUser = async (req, res) => {
  const { name, email, password } = req.body;

  // validações
  // Ref. Regex email obtida em https://html.spec.whatwg.org/multipage/input.html#valid-e-mail-address
  const emailRegex = new RegExp(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/);
  if (!emailRegex.test(email)) {
    return res.status(400).send({ message: 'Invalid entries. Try again.' });
  }

  const result = await services.userServices.createNewUser(name, email, password);
  if (result && result.message) {
    return res.status(result.status).send({ message: result.message });
  }
  return res.status(201).send(result);
};

const userLogin = async (req, res) => {
  const secret = 'cookmaster_v2';
  const { email, password } = req.body;

  if (!email || !password) return res.status(401).send({ message: 'All fields must be filled' });

  const user = await services.userServices.findUserByEmail(email);

  if (!user) return res.status(401).json({ message: 'Incorrect username or password' });
  if (user.password !== password) return res.status(401).json({ message: 'Senha inválida' });

  const jwtConfig = {
    expiresIn: '7h',
    algorithm: 'HS256',
  };

  const { _id: id, email: userEmail, role } = user;
  const token = jwt.sign({ data: [id, userEmail, role] }, secret, jwtConfig);

  res.status(200).json({
    token,
    expires: jwtConfig.expiresIn,
  });
};

module.exports = {
  createUser,
  userLogin,
};
