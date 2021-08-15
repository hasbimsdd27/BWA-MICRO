"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("courses", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
      },
      certificate: {
        type: Sequelize.BOOLEAN,
      },
      thumbnail: {
        type: Sequelize.STRING,
      },
      type: {
        type: Sequelize.ENUM("free", "premium"),
      },
      status: {
        type: Sequelize.ENUM("draft", "published"),
      },
      price: {
        type: Sequelize.INTEGER,
      },
      level: {
        type: Sequelize.ENUM(
          "all level",
          "beginner",
          "intermediate",
          "advance"
        ),
      },
      description: {
        type: Sequelize.TEXT,
      },
      mentor_id: {
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
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("courses");
  },
};
