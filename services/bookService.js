const { Op } = require('sequelize');
const { Book, Author } = require('../models');

// Função para criar um livro
exports.createBook = async (bookData) => {
  const { title, authorId, coverUri, publish_year } = bookData;
  const book = await Book.create({
    title,
    authorId,
    coverUri,
    publish_year,
  });
  return book;
};

// Função para listar livros com paginação
exports.getBooks = async (page = 1, pageSize = 10, title = '') => {
  const offset = (page - 1) * pageSize;
  const limit = pageSize;
  
  const whereCondition = title ? { title: { [Op.iLike]: `%${title}%` } } : {};

  const books = await Book.findAndCountAll({
    where: whereCondition,
    offset,
    limit,
    include: [
      {
        model: Author,
        as: 'author',
        attributes: ['id', 'name', 'photoUri'],
      }
    ],
  });

  return {
    totalBooks: books.count,
    totalPages: Math.ceil(books.count / pageSize),
    currentPage: page,
    books: books.rows,
  };
};

exports.getBookById = async (id) => {
  const book = await Book.findOne({
    where: { id },
    include: [
      {
        model: Author,
        as: 'author',
        attributes: ['id', 'name', 'photoUri'],
      }
    ],
  });

  return book;
};