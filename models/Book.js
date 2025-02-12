module.exports = (sequelize, DataTypes) => {
  const Book = sequelize.define('Book', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    coverUri: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    publish_year: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    authorId: { // Definição da chave estrangeira authorId
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Authors', // Referencia o modelo Author
        key: 'id', // Refere-se ao campo 'id' da tabela Author
      },
    },
  });

  // Associação de Book com Author
  Book.associate = (models) => {
    Book.belongsTo(models.Author, {
      foreignKey: 'authorId', // Chave estrangeira
      as: 'author',           // Alias para a associação
    });
  };

  return Book;
};