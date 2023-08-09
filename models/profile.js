const Sequelize = require("sequelize");

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "database.sqlite",
});

const Profile = sequelize.define("profile", {
  fullname: {
    type: Sequelize.STRING,
  },
  fathername: {
    type: Sequelize.STRING,
  },
  mothername: {
    type: Sequelize.STRING,
  },
  age: {
    type: Sequelize.INTEGER,
  },
  phoneNumber: {
    type: Sequelize.STRING,
  },
  uuid: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  submitted: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
});

Profile.sync({});

module.exports = Profile;
