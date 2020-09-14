const errors = {
  email_registered: { message: 'Email already registered', status: 409 },
  invalid_entries: { message: 'Invalid entries. Try again.', status: 400 },
  missing_login_entries: { message: 'All fields must be filled', status: 401 },
  incorrect_login: { message: 'Incorrect username or password', status: 401 },
  invalid_token: { message: 'jwt malformed', status: 401 },
  noauth: { status: 401, message: 'missing auth token' },
};

module.exports = function makeError(err) {
  return {
    status: errors[err].status,
    payload: { message: errors[err].message },
  };
};
