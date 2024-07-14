"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Speciality extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Speciality.init(
    {
      descriptionHTML: DataTypes.TEXT,
      descriptionContent: DataTypes.TEXT,
      image: DataTypes.BLOB("long"),
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Speciality",
    }
  );
  return Speciality;
};
