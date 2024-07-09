"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Allcode extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Allcode.hasMany(models.Users, {
        foreignKey: "positionId", // Column name of associated table
        as: "positionData", // Alias for the table
      });
      Allcode.hasMany(models.Users, {
        foreignKey: "gender", // Column name of associated table
        as: "genderData", // Alias for the table
      });
      Allcode.hasMany(models.Schedule, {
        foreignKey: "timeType", // Column name of associated table
        as: "timeTypeData", // Alias for the table
      });
    }
  }
  Allcode.init(
    {
      keyMap: DataTypes.STRING,
      type: DataTypes.STRING,
      valueEn: DataTypes.STRING,
      valueVi: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Allcode",
      timestamps: false,
    }
  );
  return Allcode;
};
