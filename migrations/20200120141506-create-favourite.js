module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('favourites', {
    userId: {
      type: Sequelize.INTEGER,
      primaryKey: true,
    },
    recipeId: {
      type: Sequelize.INTEGER,
      primaryKey: true,
    },
  }),
  down: (queryInterface) => queryInterface.dropTable('favourites'),
};
