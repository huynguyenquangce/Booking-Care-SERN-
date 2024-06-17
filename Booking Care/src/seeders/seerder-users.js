"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Users", [
      {
        email: "huynguyen16103@gmail.com",
        password: "16012003",
        firstName: "Huy",
        lastName: "Nguyen",
        address: "Ho Chi Minh",
        gender: 1,
        roleid: "R1",
        phoneNumber: "0344768682",
        positionId: "doctor",
        image: "abcxyz",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Users", null, {});
  },
};
