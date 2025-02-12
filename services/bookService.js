const { Book } = require('../models');

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

exports.getBooks = async (page = 1, pageSize = 10) => {
  const offset = (page - 1) * pageSize;
  const limit = pageSize;

  const books = await Book.findAndCountAll({
    offset,
    limit,
    include: [
      {
        model: Author,
        as: 'author',
        attributes: ['id', 'name'],
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
