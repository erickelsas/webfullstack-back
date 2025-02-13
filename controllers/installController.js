const bcrypt = require('bcrypt');
const { sequelize, User, Author, Book } = require('../models');

let isInstalled = false;

exports.install = async (req, res) => {
  if (isInstalled) {
    return res.status(400).json({ message: 'A instalação já foi realizada.' });
  }

  try {
    await sequelize.drop();

    const hashPassword = async (password) => {
        const saltRounds = 10;
        return bcrypt.hash(password, saltRounds);
      };

    await sequelize.sync();

    const users = await User.bulkCreate([
      { username: 'admin', password: await hashPassword('admin123') },
      { username: 'user1', password: await hashPassword('password1') },
      { username: 'user2', password: await hashPassword('password2') },
    ]);

    const authors = await Author.bulkCreate([
      { name: 'J.K. Rowling', photoUri: 'https://upload.wikimedia.org/wikipedia/commons/a/a0/J.K._Rowling_2010.jpg' },
      { name: 'George R.R. Martin', photoUri: 'https://upload.wikimedia.org/wikipedia/commons/a/a2/George_R._R._Martin_2011.jpg' },
      { name: 'J.R.R. Tolkien', photoUri: 'https://upload.wikimedia.org/wikipedia/commons/4/4d/J_R_R_Tolkien_1916.jpg' },
      { name: 'Isaac Asimov', photoUri: 'https://upload.wikimedia.org/wikipedia/commons/a/a6/Isaac_Asimov_1970.jpg' },
      { name: 'Agatha Christie', photoUri: 'https://upload.wikimedia.org/wikipedia/commons/c/c3/Agatha_Christie.png' },
    ]);

    const books = await Book.bulkCreate([
      { title: 'Harry Potter and the Sorcerer\'s Stone', authorId: authors[0].id, coverUri: 'https://m.media-amazon.com/images/I/51UoqRA7M0L.jpg', publish_year: 1997 },
      { title: 'A Game of Thrones', authorId: authors[1].id, coverUri: 'https://m.media-amazon.com/images/I/91gXnpI6H1L.jpg', publish_year: 1996 },
      { title: 'The Fellowship of the Ring', authorId: authors[2].id, coverUri: 'https://m.media-amazon.com/images/I/91bctWI2FjL.jpg', publish_year: 1954 },
      { title: 'Foundation', authorId: authors[3].id, coverUri: 'https://m.media-amazon.com/images/I/71sQ1vOeVrL.jpg', publish_year: 1951 },
      { title: 'Murder on the Orient Express', authorId: authors[4].id, coverUri: 'https://m.media-amazon.com/images/I/81nfwz-HHnL.jpg', publish_year: 1934 },
      { title: 'Harry Potter and the Chamber of Secrets', authorId: authors[0].id, coverUri: 'https://m.media-amazon.com/images/I/51v3L+M7liL.jpg', publish_year: 1998 },
      { title: 'A Clash of Kings', authorId: authors[1].id, coverUri: 'https://m.media-amazon.com/images/I/91rJ3fThgAL.jpg', publish_year: 1998 },
      { title: 'The Two Towers', authorId: authors[2].id, coverUri: 'https://m.media-amazon.com/images/I/91GeQ2vkkxL.jpg', publish_year: 1954 },
      { title: 'I, Robot', authorId: authors[3].id, coverUri: 'https://m.media-amazon.com/images/I/71z5Ccckx5L.jpg', publish_year: 1950 },
      { title: 'And Then There Were None', authorId: authors[4].id, coverUri: 'https://m.media-amazon.com/images/I/71z6RIbhZKL.jpg', publish_year: 1939 },
      { title: 'Harry Potter and the Prisoner of Azkaban', authorId: authors[0].id, coverUri: 'https://m.media-amazon.com/images/I/81MKrJhW8pL.jpg', publish_year: 1999 },
      { title: 'A Storm of Swords', authorId: authors[1].id, coverUri: 'https://m.media-amazon.com/images/I/81Qb9nxQyKL.jpg', publish_year: 2000 },
      { title: 'The Return of the King', authorId: authors[2].id, coverUri: 'https://m.media-amazon.com/images/I/91TK1TIh3vL.jpg', publish_year: 1955 },
      { title: 'The Caves of Steel', authorId: authors[3].id, coverUri: 'https://m.media-amazon.com/images/I/91Xz4Vv0cJL.jpg', publish_year: 1954 },
      { title: 'Death on the Nile', authorId: authors[4].id, coverUri: 'https://m.media-amazon.com/images/I/91VfbnExqzL.jpg', publish_year: 1937 },
    ]);

    isInstalled = true;

    res.status(200).json({
      message: 'Instalação concluída com sucesso',
      users,
      authors,
      books,
    });
  } catch (err) {
    res.status(500).json({ message: 'Erro na instalação', error: err.message });
  }
};