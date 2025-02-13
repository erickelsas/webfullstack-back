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
      { name: 'J.K. Rowling', photoUri: 'https://upload.wikimedia.org/wikipedia/commons/5/5d/J._K._Rowling_2010.jpg' },
      { name: 'George R.R. Martin', photoUri: 'https://upload.wikimedia.org/wikipedia/commons/e/ee/George_R._R._Martin_at_Archipelacon.jpg' },
      { name: 'J.R.R. Tolkien', photoUri: 'https://upload.wikimedia.org/wikipedia/commons/d/d4/J._R._R._Tolkien%2C_ca._1925.jpg' },
      { name: 'Isaac Asimov', photoUri: 'https://upload.wikimedia.org/wikipedia/commons/3/34/Isaac.Asimov01.jpg' },
      { name: 'Agatha Christie', photoUri: 'https://upload.wikimedia.org/wikipedia/commons/c/cf/Agatha_Christie.png' },
    ]);
    
    const books = await Book.bulkCreate([
      { title: 'Harry Potter and the Sorcerer\'s Stone', authorId: authors[0].id, coverUri: 'https://upload.wikimedia.org/wikipedia/en/6/6b/Harry_Potter_and_the_Philosopher%27s_Stone_Book_Cover.jpg', publish_year: 1997 },
      { title: 'A Game of Thrones', authorId: authors[1].id, coverUri: 'https://upload.wikimedia.org/wikipedia/en/9/93/AGameOfThrones.jpg', publish_year: 1996 },
      { title: 'The Fellowship of the Ring', authorId: authors[2].id, coverUri: 'https://upload.wikimedia.org/wikipedia/en/8/8e/The_Fellowship_of_the_Ring_cover.gif', publish_year: 1954 },
      { title: 'Foundation', authorId: authors[3].id, coverUri: 'https://upload.wikimedia.org/wikipedia/en/2/25/Foundation_gnome.jpg', publish_year: 1951 },
      { title: 'Murder on the Orient Express', authorId: authors[4].id, coverUri: 'https://upload.wikimedia.org/wikipedia/en/4/4b/Murder_on_the_Orient_Express_First_Edition_Cover_1934.jpg', publish_year: 1934 },
      { title: 'Harry Potter and the Chamber of Secrets', authorId: authors[0].id, coverUri: 'https://upload.wikimedia.org/wikipedia/en/5/5c/Harry_Potter_and_the_Chamber_of_Secrets.jpg', publish_year: 1998 },
      { title: 'A Clash of Kings', authorId: authors[1].id, coverUri: 'https://upload.wikimedia.org/wikipedia/en/9/93/AClashOfKings.jpg', publish_year: 1998 },
      { title: 'The Two Towers', authorId: authors[2].id, coverUri: 'https://upload.wikimedia.org/wikipedia/en/a/a1/The_Two_Towers_cover.gif', publish_year: 1954 },
      { title: 'I, Robot', authorId: authors[3].id, coverUri: 'https://upload.wikimedia.org/wikipedia/en/3/3b/I_Robot_%28Book%29.jpg', publish_year: 1950 },
      { title: 'And Then There Were None', authorId: authors[4].id, coverUri: 'https://upload.wikimedia.org/wikipedia/en/1/16/And_Then_There_Were_None_First_Edition_Cover_1939.jpg', publish_year: 1939 },
      { title: 'Harry Potter and the Prisoner of Azkaban', authorId: authors[0].id, coverUri: 'https://upload.wikimedia.org/wikipedia/en/a/a0/Harry_Potter_and_the_Prisoner_of_Azkaban.jpg', publish_year: 1999 },
      { title: 'A Storm of Swords', authorId: authors[1].id, coverUri: 'https://upload.wikimedia.org/wikipedia/en/6/6d/A_Storm_of_Swords.jpg', publish_year: 2000 },
      { title: 'The Return of the King', authorId: authors[2].id, coverUri: 'https://upload.wikimedia.org/wikipedia/en/1/11/The_Return_of_the_King_cover.gif', publish_year: 1955 },
      { title: 'The Caves of Steel', authorId: authors[3].id, coverUri: 'https://upload.wikimedia.org/wikipedia/en/5/57/TheCavesOfSteel.jpg', publish_year: 1954 },
      { title: 'Death on the Nile', authorId: authors[4].id, coverUri: 'https://upload.wikimedia.org/wikipedia/en/4/47/DeathOnTheNileFirstEditionCover1937.jpg', publish_year: 1937 },
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