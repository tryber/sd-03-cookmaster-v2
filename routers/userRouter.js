const { Router } = require('express');
const { createAdmin, createUser } = require('../controllers/usersController');
const auth = require('../middlewares/authMiddleware');

const usersRoute = Router();

// Criar um usuário
usersRoute.post('/', createUser);

// Criar um admin
usersRoute.post('/admin', auth(true), createAdmin);

module.exports = usersRoute;
