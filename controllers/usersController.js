// service

const createUser = async (req, res) => {
  const { name, email, password } = req.body;
  return res.status(404);
};

const createAdmin = async (_req, res) => res.status(404);

module.exports = {
  createAdmin,
  createUser,
};
