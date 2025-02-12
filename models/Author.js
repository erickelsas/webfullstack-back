module.exports = (sequelize, DataTypes) => {
    const Author = sequelize.define('Author', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      photoUri: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    });
  
    Author.associate = (models) => {
      Author.hasMany(models.Book, {
        foreignKey: 'authorId',
        as: 'books',
      });
    };
  
    return Author;
  };  