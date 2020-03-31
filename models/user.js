const bcrypt = require("bcrypt");

/**
 * Hash user's password
 * @param {object} user user object
 */
const hashPassword = async (user) => {
  const saltRounds = 10;
  const u = user;
  const salt = await bcrypt.genSalt(saltRounds);
  u.password = await bcrypt.hash(u.password, salt);
  return u;
};

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("user", {
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

  // hash the password
  User.beforeCreate(hashPassword);
  User.beforeUpdate(hashPassword);

  User.prototype.validatePassword = function (password) {
    return bcrypt.compareSync(password, this.password);
  };

  // eslint-disable-next-line func-names
  User.associate = (models) => {
    User.hasMany(models.recipe, {
      foreignKey: "authorId",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
    User.hasMany(models.favourite, {
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
  };
  return User;
};
