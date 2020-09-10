const jwtConfig = {
  expiresIn: '2d',
  algorithm: 'HS256',
};

const secret = 'minhaSenhaSuperSecreta';

module.exports = {
  jwtConfig,
  secret,
};
