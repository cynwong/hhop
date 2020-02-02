module.exports = (sequelize, DataTypes) => {
  const recipe = sequelize.define("recipe", {
    title: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: true,
      },
    },
    ingredients: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: true,
      },
    },
    method: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: true,
      },
    },
    is_private: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
      validate: {
        notNull: true,
      },
    },
    creditTo: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    source: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    photo: {
      type: DataTypes.STRING(500),
      allowNull: true,
    },
  }, {});
  recipe.associate = (models) => {
    recipe.belongsTo(models.user, {
      foreignKey: {
        name: "authorId",
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
    recipe.hasMany(models.favourite, {
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
  };
  return recipe;
};
