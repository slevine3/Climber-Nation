module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define({
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    password: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  });
  return User;
};

// import { Sequelize } from "sequelize";
// import db from "../config/Database.js";

// const { DataTypes } = Sequelize;

// const User = db.define("files", {
//   firstName: {
//     type: DataTypes.STRING,
//   },
//   firstName: {
//     type: DataTypes.STRING,
//     allowNull: false,
//     validate: {
//       notEmpty: true,
//     },
//   },
//   username: {
//     type: DataTypes.STRING,
//     allowNull: false,
//     validate: {
//       notEmpty: true,
//     },
//   },
//   password: {
//     type: DataTypes.INTEGER,
//     allowNull: false,
//     validate: {
//       notEmpty: true,
//     },
//   },
// });

// export default User;
