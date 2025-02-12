const { Author, Sequelize } = require('../models');

exports.createAuthor = async (authorData) => {
  const { name, photoUri } = authorData;
  const author = await Author.create({
    name,
    photoUri,
  });
  return author;
};


exports.getAuthorById = async (id) => {
  if (!id) {
    throw new Error('ID do autor é necessário para a busca');
  }

  const author = await Author.findByPk(id);

  if (!author) {
    throw new Error('Autor não encontrado');
  }

  return author;
};
exports.getAllAuthors = async () => {
  const authors = await Author.findAll();
  return authors;
};
