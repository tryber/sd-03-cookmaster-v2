const { Router } = require('express');

const usersControler = require('../controller/usersControler');

const users = Router();

users.get('/login', usersControler.selectUser);
users.post('/', usersControler.insertUser);

module.exports = users;
