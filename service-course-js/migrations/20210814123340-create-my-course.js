"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("my_courses", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      course_id: {
        type: Sequelize.INTEGER,
      },
      user_id: {
        type: Sequelize.INTEGER,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });

    await queryInterface.addConstraint("my_courses", {
      type: "unique",
      fields: ["course_id", "user_id"],
      name: "UNIQUE_USERS_COURSE",
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("my_courses");
  },
};
