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

exports.getAuthorById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: 'Author ID is required' });
    }

    const author = await authorService.getAuthorById(id);
    if (!author) {
      return res.status(404).json({ message: 'Author not found' });
    }

    res.status(200).json(author);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching author by ID', error: err.message });
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