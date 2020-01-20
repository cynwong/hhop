'use strict';
module.exports = (sequelize, DataTypes) => {
  const recipe = sequelize.define('recipe', {
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
    }
  }, {});
  recipe.associate = function (models) {
    recipe.hasMany(models.favourite, {
      onDelete: "RESTRICT",
      onUpdate: "CASCADE"
    });
  };
  return recipe;
};