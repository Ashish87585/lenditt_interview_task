module.exports = (sequelize, dataTypes) => {
  const users = sequelize.define("users", {
    name: { type: dataTypes.STRING, allowNull: false },
    email: { type: dataTypes.STRING, unique: true, allowNull: false },
    gender: dataTypes.STRING,
    mobile: { type: dataTypes.STRING, unique: true, allowNull: false },
    password: { type: dataTypes.STRING, allowNull: false },
  });

  return users;
};
