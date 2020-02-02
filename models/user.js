const bcrypt = require("bcrypt");

const saltRound = 10;

const hashPassword = async (info) => {
  const u = info;
  const salt = await bcrypt.genSalt(saltRound);
  u.password = await bcrypt.hash(u.password, salt);
  return u;
};

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

  // add password validation
  user.prototype.validPassword = async (password) => {
    try {
      const isMatch = await bcrypt.compare(password, this.password);
      return isMatch;
    } catch (err) {
      return false;
    }
  };

  // hash the password
  user.beforeCreate(hashPassword);
  user.beforeUpdate(hashPassword);

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
