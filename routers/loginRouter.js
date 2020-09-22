const { Router } = require('express');
const { login } = require('../controllers/loginController');

const loginRoute = Router();

// Login do usuário
loginRoute.post('/', login);

module.exports = loginRoute;
