"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("doctor_info", {
      //   doctorId: DataTypes.INTEGER,
      //   priceId: DataTypes.STRING,
      //   provinceId: DataTypes.STRING,
      //   paymentId: DataTypes.STRING,
      //   addressClinic: DataTypes.TEXT,
      //   nameClinic: DataTypes.TEXT,
      //   note: DataTypes.TEXT,
      //   count: DataTypes.INTEGER,
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      doctorId: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      priceId: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      provinceId: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      paymentId: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      addressClinic: {
        allowNull: false,
        type: Sequelize.TEXT,
      },
      nameClinic: {
        allowNull: false,
        type: Sequelize.TEXT,
      },
      note: {
        allowNull: true,
        type: Sequelize.TEXT,
        defaultValue: "",
      },
      count: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("doctor_info");
  },
};
