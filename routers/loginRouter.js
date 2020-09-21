const { Router } = require('express');
const login = require('../controllers/loginController');

// Login do usuário
Router.post('/', login);
