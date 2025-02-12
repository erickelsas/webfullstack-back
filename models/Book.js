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
    });
  
    Book.associate = (models) => {
      Book.belongsTo(models.Author, {
        foreignKey: 'authorId',
        as: 'author',
      });
    };
  
    return Book;
  };
  