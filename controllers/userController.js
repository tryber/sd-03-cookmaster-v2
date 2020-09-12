const { Router } = require('express');
const routes = require('../routes');
const middlewares = require('../middlewares');

const users = Router();

users.route('/').post(routes.newUser);

users.route('/admin').post(middlewares.auth(), routes.newAdmin);

module.exports = users;
