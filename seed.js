const connect = require('./users/connection');
const model = require('./users/modelUsers');

const createAdmin = async () => model.registerUsers('root', null, 'admin', 'admin');

module.exports = createAdmin;
