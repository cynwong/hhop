module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define("user", {
    username: {
      type: DataTypes.STRING(255),
      unique: true,
      allowNull: false,
      validate: {
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
    first_name: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    last_name: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: {
        notEmpty: true,
        notNull: true,
      },
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: {
        isEmail: true,
        notEmpty: true,
        notNull: true,
      },
    },
  });

  // eslint-disable-next-line func-names
  user.associate = function (models) {
    user.hasMany(models.recipe, {
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
