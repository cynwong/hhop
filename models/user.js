module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define("user", {
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
        notEmpty: true,
        notNull: true,
      },
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: {
        len: [8, 16],
        notEmpty: true,
        notNull: true,
      },
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: {
        notEmpty: true,
        notNull: true,
      },
    },
  });

  // eslint-disable-next-line func-names
  user.associate = function (models) {
    user.hasMany(models.recipe, {
      foreignKey: "authorId",
      onDelete: "RESTRICT",
      onUpdate: "CASCADE",
    });
    user.hasMany(models.favourite, {
      onDelete: "RESTRICT",
      onUpdate: "CASCADE",
    });
  };
  return user;
};
