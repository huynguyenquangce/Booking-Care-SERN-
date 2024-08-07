"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class MarkDown extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      MarkDown.belongsTo(models.Users, {
        foreignKey: "doctorId", // Column name of associated table
        targetKey: "id",
        // as: "positionData", // Alias for the table
      });
    }
  }
  MarkDown.init(
    {
      contentHTML: DataTypes.TEXT("long"),
      contentMarkDown: DataTypes.TEXT("long"),
      description: DataTypes.TEXT("long"),
      doctorId: DataTypes.INTEGER,
      specialty: DataTypes.INTEGER,
      clinicId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "MarkDown",
    }
  );
  return MarkDown;
};
