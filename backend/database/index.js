const { Sequelize } = require("sequelize");

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./database.sqlite",
  charset: "utf8",
  collate: "NOCASE",
});

(async () => await sequelize.authenticate())();
(async () => await sequelize.sync())();

module.exports = sequelize;
