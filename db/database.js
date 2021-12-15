const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize("test", "root", "", {
  host: "localhost",
  dialect: "mysql",
  pool: { max: 5, min: 0, idle: 10000 },
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Database connected successfully.");
  })
  .catch((err) => {
    console.log(err);
  });

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = require("../models/users")(sequelize, DataTypes);

db.sequelize
  .sync()
  .then(() => {
    console.log("sync success");
  })
  .catch((err) => {
    console.log(err);
  });

  module.exports = db;