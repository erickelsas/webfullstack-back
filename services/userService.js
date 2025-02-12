const { User } = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES = process.env.JWT_EXPIRES || '1h';

if (!JWT_SECRET) {
  throw new Error('JWT_SECRET não está definido no ambiente!');
}

exports.loginUser = async (userData) => {
  const { username, password } = userData;

  try {
    const user = await User.findOne({ where: { username } });
    if (!user) {
      throw new Error('Usuário não encontrado');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error('Senha inválida');
    }

    // Gerando o token JWT
    const token = jwt.sign(
      { id: user.id, username: user.username },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES }
    );

    return { token };
  } catch (err) {
    // Lançando erro com mensagem mais detalhada
    throw new Error(`Erro no login: ${err.message}`);
  }
};
