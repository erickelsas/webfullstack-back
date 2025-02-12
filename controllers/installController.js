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
      { name: 'J.K. Rowling', photoUri: '/uploads/jk_rowling.jpg' },
      { name: 'George R.R. Martin', photoUri: '/uploads/george_rr_martin.jpg' },
      { name: 'J.R.R. Tolkien', photoUri: '/uploads/jrr_tolkien.jpg' },
      { name: 'Isaac Asimov', photoUri: '/uploads/isaac_asimov.jpg' },
      { name: 'Agatha Christie', photoUri: '/uploads/agatha_christie.jpg' },
    ]);

    const books = await Book.bulkCreate([
      { title: 'Harry Potter and the Sorcerer\'s Stone', authorId: authors[0].id, coverUri: '/uploads/harry_potter.jpg', publish_year: 1997 },
      { title: 'A Game of Thrones', authorId: authors[1].id, coverUri: '/uploads/game_of_thrones.jpg', publish_year: 1996 },
      { title: 'The Fellowship of the Ring', authorId: authors[2].id, coverUri: '/uploads/fellowship_of_the_ring.jpg', publish_year: 1954 },
      { title: 'Foundation', authorId: authors[3].id, coverUri: '/uploads/foundation.jpg', publish_year: 1951 },
      { title: 'Murder on the Orient Express', authorId: authors[4].id, coverUri: '/uploads/murder_on_orient_express.jpg', publish_year: 1934 },
      { title: 'Harry Potter and the Chamber of Secrets', authorId: authors[0].id, coverUri: '/uploads/harry_potter2.jpg', publish_year: 1998 },
      { title: 'A Clash of Kings', authorId: authors[1].id, coverUri: '/uploads/clash_of_kings.jpg', publish_year: 1998 },
      { title: 'The Two Towers', authorId: authors[2].id, coverUri: '/uploads/two_towers.jpg', publish_year: 1954 },
      { title: 'I, Robot', authorId: authors[3].id, coverUri: '/uploads/i_robot.jpg', publish_year: 1950 },
      { title: 'And Then There Were None', authorId: authors[4].id, coverUri: '/uploads/and_then_there_were_none.jpg', publish_year: 1939 },
      { title: 'Harry Potter and the Prisoner of Azkaban', authorId: authors[0].id, coverUri: '/uploads/harry_potter3.jpg', publish_year: 1999 },
      { title: 'A Storm of Swords', authorId: authors[1].id, coverUri: '/uploads/storm_of_swords.jpg', publish_year: 2000 },
      { title: 'The Return of the King', authorId: authors[2].id, coverUri: '/uploads/return_of_the_king.jpg', publish_year: 1955 },
      { title: 'The Caves of Steel', authorId: authors[3].id, coverUri: '/uploads/caves_of_steel.jpg', publish_year: 1954 },
      { title: 'Death on the Nile', authorId: authors[4].id, coverUri: '/uploads/death_on_the_nile.jpg', publish_year: 1937 },
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
