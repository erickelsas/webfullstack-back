const authorService = require('../services/authorService');

exports.createAuthor = async (req, res) => {
  try {
    const { name, photoUri } = req.body;
    const author = await authorService.createAuthor({ name, photoUri });
    res.status(201).json(author);
  } catch (err) {
    res.status(500).json({ message: 'Error creating author', error: err.message });
  }
};

exports.getAuthorsByName = async (req, res) => {
  try {
    const { name } = req.query;
    const authors = await authorService.getAuthorsByName(name);
    res.status(200).json(authors);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching authors', error: err.message });
  }
};

exports.getAllAuthors = async (req, res) => {
  try {
    const authors = await authorService.getAllAuthors();
    res.status(200).json(authors);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching authors', error: err.message });
  }
};