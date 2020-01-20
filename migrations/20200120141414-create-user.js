'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      username: {
        type: DataTypes.STRING(255),
        unique: true,
        allowNull: false,
        validate: {
          notEmpty: true,
          notNull: true
        }
      },
      password: {
        type: DataTypes.STRING(255),
        allowNull: false,
        validate: {
          len: [8, 16],
          notEmpty: true,
          notNull: true
        }
      },
      first_name: {
        type: DataTypes.STRING(255),
        allowNull: true
      },
      last_name: {
        type: DataTypes.STRING(255),
        allowNull: false,
        validate: {
          notEmpty: true,
          notNull: true
        }
      },
      email: {
        type: DataTypes.STRING(255),
        allowNull:false,
        validate: {
          isEmail: true,
          notEmpty: true,
          notNull: true
        }
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
    return queryInterface.dropTable('users');
  }
};