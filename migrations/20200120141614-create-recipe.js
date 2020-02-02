module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable("recipes", {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    title: {
      type: Sequelize.STRING(255),
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: true,
      },
    },
    ingredients: {
      type: Sequelize.TEXT,
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: true,
      },
    },
    method: {
      type: Sequelize.TEXT,
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: true,
      },
    },
    is_private: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: true,
      validate: {
        notNull: true,
      },
    },
    creditTo: {
      type: Sequelize.STRING(255),
      allowNull: true,
    },
    source: {
      type: Sequelize.STRING(255),
      allowNull: true,
    },
    photo: {
      type: Sequelize.STRING(255),
      allowNull: true,
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
  down: (queryInterface) => queryInterface.dropTable("recipes"),
};
