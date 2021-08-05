"use strict";
const bcrypt = require("bcrypt");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "users",
      [
        {
          name: "John Doe",
          profession: "Admin Micro",
          role: "admin",
          email: "johndoe@email.com",
          password: await bcrypt.hash("rahasia1234", 10),
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "John Doe 2",
          profession: "Frontend Developer",
          role: "student",
          email: "johndoe2@email.com",
          password: await bcrypt.hash("rahasia1234", 10),
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("users", null, {});
  },
};
