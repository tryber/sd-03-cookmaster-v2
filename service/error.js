const messages = {
  1: 'Invalid entries. Try again.',
  2: 'Email already registered',
  3: 'All fields must be filled',
  4: 'Incorrect username or password',
  5: 'jwt malformed',
  6: 'recipe not found',
  7: 'missing auth token',
};

const codes = {
  400: '400',
  409: '409',
  401: '401',
  404: '404',
};

const emailTest = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

const validateNewUser = (name, email, password) => {
  if (!name || !email || !password) return { code: codes[400], message: messages[1] };

  //* Valida o e-mail:

  const validEmail = emailTest.test(email);
  if (!validEmail) return { code: codes[400], message: messages[1] };

  //* Passando nas validações retorna nullish
  return 'passou';
};

const validateLogin = (email, password) => {
  if (!email || !password) return { code: codes[401], message: messages[3] };

  return 'passou';
};

const validateRecipe = (name, ingredients, preparation) => {
  if (!name || !ingredients || !preparation) return { code: codes[400], message: messages[1] };
  return 'passou';
};

module.exports = {
  messages,
  codes,
  validateNewUser,
  validateLogin,
  validateRecipe,
};
