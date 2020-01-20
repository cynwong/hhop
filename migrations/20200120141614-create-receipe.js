'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('recipe', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      ingredients: {
        type: DataTypes.JSON,
        allowNull: false,
        validate: {
          notNull: true,
          notEmpty: true
        }
      },
      method: {
        type: DataTypes.JSON,
        allowNull: false,
        validate: {
          notNull: true,
          notEmpty: true
        }
      },
      is_private: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
        validate: {
          notNull: true
        }
      },
      creditTo: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      source: {
        type: DataTypes.STRING(255),
        allowNull: true,
        validate: {
          is: /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/gi,
        }
      },
      photo: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('receipes');
  }
};