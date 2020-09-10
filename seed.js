/* Formato obrigatório de documento da collection 'USERS':
{ "name" : "Erick Jacquin", "email" : "erickjacquin@gmail.com",
"password" : "12345678", "role" : "user" };

Query criada para atender requisito 6 e em conformidade com o solicitado
no README e testes */
db.users.insertOne({
  name: 'admin',
  email: 'root@email.com',
  password: 'admin',
  role: 'admin',
});
