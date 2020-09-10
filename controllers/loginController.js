const { Router } = require('express');
const rescue = require('express-rescue');

login = Router();

login.post(
  '/',
  rescue(async (_req, res) => {
    return res.status(200).json('success');
  }),
);

module.exports = login;
