const { Router } = require('express');
const { createAdmin, createUser } = require('../controllers/usersController');

const usersRoute = Router();

// Criar um usuário
usersRoute.post('/', createUser);

// Criar um admin
usersRoute.post('/admin', createAdmin);

module.exports = usersRoute;
