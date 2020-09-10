const services = require('../services');

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

module.exports = {
  createUser,
};
