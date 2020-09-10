const { Router } = require('express');
const rescue = require('express-rescue');

const login = Router();

login.post(
  '/',
  rescue(async (_req, res) => (res.status(200).json('success') )),);

module.exports = login;
