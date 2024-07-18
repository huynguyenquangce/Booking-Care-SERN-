"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Speciality", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      descriptionHTML: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      descriptionContent: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      image: {
        type: Sequelize.BLOB("long"),
        allowNull: false,
      },
      nameVi: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      nameEn: {
        type: Sequelize.STRING,
        allowNull: false,
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
    await queryInterface.dropTable("Speciality");
  },
};
