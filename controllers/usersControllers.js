const { Router } = require('express');
const rescue = require('express-rescue');

const usersService = require('../service/usersService');

const users = Router();

// module.exports = (req, res) => {
//   const data = new Model({
//     name: req.body.name,
//     email: req.body.email,
//     password: req.body.password,
//     role: req.body.role,
//   });

//   data.save().then((doc) => {
//     res.status(201).json({ message: 'Novo usuário', data: doc });
//   }).catch(err => {
//     res.status(500).send('Erro ao salvar o usuário no banco', err);
//   });
// };

users.post('/', rescue(async (req, res) => {
  const { name, email, password } = req.body;

  const user = await usersService.createUsers(name, email, password);

  // console.log(user);

  if (user.error) {
    return res.status(user.cod).json({
      message: user.message,
    });
  }

  return res.status(201).json(user);
}));

module.exports = users;
