const { Author, Sequelize } = require('../models');

exports.createAuthor = async (authorData) => {
  const { name, photoUri } = authorData;
  const author = await Author.create({
    name,
    photoUri,
  });
  return author;
};

exports.getAuthorsByName = async (name) => {
  if (!name) {
    throw new Error('Nome do autor é necessário para a busca');
  }

  const authors = await Author.findAll({
    where: {
      name: {
        [Sequelize.Op.iLike]: `%${name}%`,
      }
    }
  });

  return authors;
};

exports.getAllAuthors = async () => {
  const authors = await Author.findAll();
  return authors;
};
