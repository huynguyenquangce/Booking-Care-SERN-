"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
      "Allcodes",
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        key: {
          type: Sequelize.STRING,
        },
        type: {
          type: Sequelize.STRING,
        },
        valueEn: {
          type: Sequelize.STRING,
        },
        valueVi: {
          type: Sequelize.STRING,
        },
      },
      {
        timestamps: false, // Tắt createdAt và updatedAt
      }
    );
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Allcodes");
  },
};
