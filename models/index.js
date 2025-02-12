const { Sequelize } = require('sequelize');

const config = require('../config/config');
const AuthorModel = require("./Author");
const BookModel = require("./Book");
const UserModel = require("./User");

const sequelize = new Sequelize(config.database, config.username, config.password, {
    host: config.host,
    dialect: 'postgres',
    port: config.port,
    logging: console.log,
  });

  const User = UserModel(sequelize, Sequelize.DataTypes);
  const Author = AuthorModel(sequelize, Sequelize.DataTypes);
  const Book = BookModel(sequelize, Sequelize.DataTypes);

  Author.hasMany(Book, { foreignKey: 'authorId' });
  Book.belongsTo(Author, { foreignKey: 'authorId' });

  module.exports = {
      sequelize,
      Author,
      User,
      Book
  }