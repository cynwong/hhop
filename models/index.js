const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");

const basename = path.basename(__filename);
// // eslint-disable-next-line import/no-dynamic-require
// let configFile;
// if (process.env.JAWSDB_URL) {
//   configFile = path.resolve(__dirname, "..", "config", "config.production.json");
// } else {
//   configFile = path.resolve(__dirname, "..", "config", "config.json");
// }

// // eslint-disable-next-line import/no-dynamic-require
// const config = require(configFile)[env];
const db = {};

// const sequelize = new Sequelize(config.database, config.username, config.password, config);
let sequelize;
if (process.env.JAWSDB_URL) {
  sequelize = new Sequelize(process.env.JAWSDB_URL, {});
} else {
  const env = process.env.NODE_ENV || "development";
  const config = path.resolve(__dirname, "..", "config", "config.json")[env];
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter((file) => (file.indexOf(".") !== 0) && (file !== basename) && (file.slice(-3) === ".js"))
  .forEach((file) => {
    const model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
