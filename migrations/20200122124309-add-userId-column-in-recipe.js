// Add Foreign key "authorId" to recipe table.

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.addColumn(
    "recipes",
    "authorId",
    {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
      onDelete: "RESTRICT",
      onUpdate: "CASCADE",
    },
  ),

  down: (queryInterface) => queryInterface.removeColumn("recipes", "authorId"),
};
