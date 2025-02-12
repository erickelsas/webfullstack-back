const bookService = require('../services/bookService');

exports.createBook = async (req, res) => {
  try {
    const { title, authorId, coverUri, publish_year } = req.body;
    const book = await bookService.createBook({ title, authorId, coverUri, publish_year });
    res.status(201).json(book);
  } catch (err) {
    res.status(500).json({ message: 'Error creating book', error: err.message });
  }
};

exports.getBooks = async (req, res) => {
  try {
    const { page = 1, pageSize = 10, title } = req.query;
    const result = await bookService.getBooks(parseInt(page), parseInt(pageSize), title);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching books', error: err.message });
  }
};

exports.getBookById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: 'Book ID is required' });
    }

    const book = await bookService.getBookById(id);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    res.status(200).json(book);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching book by ID', error: err.message });
  }
};