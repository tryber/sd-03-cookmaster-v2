const { Router } = require('express');
const rescue = require('express-rescue');

login = Router();


login.get(
    '/',
     rescue(async (_req, res) => {  
      return res.status(205);
    }
     ),
  );


module.exports = login;