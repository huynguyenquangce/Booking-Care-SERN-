"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Users.belongsTo(models.Allcode, {
        foreignKey: "positionId", // Column name of associated table
        targetKey: "keyMap",
        as: "positionData", // Alias for the table
      });
      Users.belongsTo(models.Allcode, {
        foreignKey: "gender", // Column name of associated table
        targetKey: "keyMap",
        as: "genderData", // Alias for the table
      });
    }
  }
  Users.init(
    {
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      address: DataTypes.STRING,
      gender: DataTypes.STRING,
      roleid: DataTypes.STRING,
      phoneNumber: DataTypes.STRING,
      positionId: DataTypes.STRING,
      image: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Users",
    }
  );
  return Users;
};
