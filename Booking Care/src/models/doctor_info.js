"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Doctor_Info extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Doctor_Info.belongsTo(models.Allcode, {
        foreignKey: "priceId", // Column name of associated table
        targetKey: "keyMap",
        as: "priceInfo", // Alias for the table
      });
      Doctor_Info.belongsTo(models.Allcode, {
        foreignKey: "provinceId", // Column name of associated table
        targetKey: "keyMap",
        as: "provinceInfo", // Alias for the table
      });
      Doctor_Info.belongsTo(models.Allcode, {
        foreignKey: "paymentId", // Column name of associated table
        targetKey: "keyMap",
        as: "paymentInfo", // Alias for the table
      });
      Doctor_Info.belongsTo(models.Users, {
        foreignKey: "doctorId", // Column name of associated table
        targetKey: "id",
        as: "InfoTableData", // Alias for the table
      });
      // get value from allcode
      // Doctor_Info.belongsTo(models.Allcode, {
      //   foreignKey: "priceId", // Column name of associated table
      //   targetKey: "keyMap",
      //   as: "PriceData", // Alias for the table
      // });
      // Doctor_Info.belongsTo(models.Allcode, {
      //   foreignKey: "provinceId", // Column name of associated table
      //   targetKey: "keyMap",
      //   as: "ProvinceData", // Alias for the table
      // });
      // Doctor_Info.belongsTo(models.Allcode, {
      //   foreignKey: "paymentId", // Column name of associated table
      //   targetKey: "keyMap",
      //   as: "paymentData", // Alias for the table
      // });
    }
  }
  Doctor_Info.init(
    {
      doctorId: DataTypes.INTEGER,
      priceId: DataTypes.STRING,
      provinceId: DataTypes.STRING,
      paymentId: DataTypes.STRING,
      addressClinic: DataTypes.TEXT,
      nameClinic: DataTypes.TEXT,
      note: DataTypes.TEXT,
      count: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Doctor_Info",
      freezeTableName: true,
    }
  );
  return Doctor_Info;
};
