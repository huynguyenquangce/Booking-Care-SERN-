"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
      "Markdowns",
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },

        // contentHTML: DataTypes.TEXT("long"),
        // contentMarkDown: DataTypes.TEXT("long"),
        // description: DataTypes.TEXT("long"),
        // doctorId: DataTypes.INTEGER,
        // specialty: DataTypes.INTEGER,
        // clinicId: DataTypes.INTEGER,
        contentHTML: {
          allowNull: false,
          type: Sequelize.TEXT("long"),
        },
        contentMarkDown: {
          allowNull: false,
          type: Sequelize.TEXT("long"),
        },
        description: {
          allowNull: true,
          type: Sequelize.TEXT("long"),
        },
        doctorId: {
          allowNull: true,
          type: Sequelize.INTEGER,
        },
        specialty: {
          allowNull: true,
          type: Sequelize.INTEGER,
        },
        clinicId: {
          allowNull: true,
          type: Sequelize.INTEGER,
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
      },
      {
        timestamps: false, // Tắt createdAt và updatedAt
      }
    );
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Markdowns");
  },
};
