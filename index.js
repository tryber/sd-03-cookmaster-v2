const express = require('express');
const bodyParser = require('body-parser');
const UserRouter = require('./routes/users');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const port = process.env.PORT || 8080;

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});
app.use((req, _res, next) => {
  console.log(`${req.method} ${req.path}`);
  console.log(`${JSON.stringify(req.body)} ${''}`);

  next();
});
app.use('/users', UserRouter);

app.listen(port);
console.log(`conectado na porta ${port}`);
