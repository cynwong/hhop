module.exports = (sequelize) => {
  const favourite = sequelize.define('favourite', {}, {});

  favourite.associate = function (models) {
    favourite.belongsTo(models.user, {
      onDelete: 'RESTRICT',
      onUpdate: 'CASCADE',
    });

    favourite.belongsTo(models.recipe, {
      onDelete: 'RESTRICT',
      onUpdate: 'CASCADE',
    });
  };
  return favourite;
};
