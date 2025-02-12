const userService = require('../services/userService');

exports.loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    console.log(username, password)
    const result = await userService.loginUser({ username, password });

    res.status(200).json({ message: 'Login bem-sucedido', token: result.token });
  } catch (err) {
    res.status(401).json({ message: 'Erro de autenticação', error: err.message });
  }
};
