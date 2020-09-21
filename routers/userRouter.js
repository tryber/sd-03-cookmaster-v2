const { Router } = require('express');
const { createAdmin, createUser } = require('../controllers/usersController');

// Criar um usuário
Router.post('/', createUser);

// Criar um admin
Router.post('/admin', createAdmin);
