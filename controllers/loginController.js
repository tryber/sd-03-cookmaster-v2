const { Router } = require('express');
const routes = require('../routes');
const middlewares = require('../middlewares');

const login = Router();

login.route('/').post(routes.login, middlewares.login);

module.exports = login;
