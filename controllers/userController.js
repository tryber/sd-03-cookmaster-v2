const { Router } = require('express');
const routes = require('../routes');

const users = Router();

users.route('/').post(routes.newUser);

module.exports = users;
