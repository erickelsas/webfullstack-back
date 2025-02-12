const jwt = require("jsonwebtoken");
const { User } = require("../models");
const bcrypt = require("bcrypt");

const generateToken = (user) => {
  const payload = {
    id: user.id,
    username: user.username
  };

  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES,
  });
};

exports.login = async (email, password) => {
  try {
    const user = await User.findOne({ where: { email } });

    if (user === null) {
      return null;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return null;
    }

    return generateToken(user);
  } catch (error) {
    console.error(error);
    throw new Error("Error during login process");
  }
};