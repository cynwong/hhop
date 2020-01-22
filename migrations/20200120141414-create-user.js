module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable("users", {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    username: {
      type: Sequelize.STRING(255),
      unique: true,
      allowNull: false,
      validate: {
        notEmpty: true,
        notNull: true,
      },
    },
    password: {
      type: Sequelize.STRING(255),
      allowNull: false,
      validate: {
        len: [8, 16],
        notEmpty: true,
        notNull: true,
      },
    },
    first_name: {
      type: Sequelize.STRING(255),
      allowNull: true,
    },
    last_name: {
      type: Sequelize.STRING(255),
      allowNull: false,
      validate: {
        notEmpty: true,
        notNull: true,
      },
    },
    email: {
      type: Sequelize.STRING(255),
      allowNull: false,
      validate: {
        isEmail: true,
        notEmpty: true,
        notNull: true,
      },
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
  }),
  down: (queryInterface) => queryInterface.dropTable("users"),
};
