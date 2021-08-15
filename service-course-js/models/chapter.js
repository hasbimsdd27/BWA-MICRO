"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Chapter extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Chapter.belongsTo(models.Course, {
        foreignKey: "course_id",
        sourceKey: "id",
      });
      Chapter.hasMany(models.Chapter, {
        foreignKey: "chapter_id",
        sourceKey: "id",
        as: "lessons",
        onDelete: "cascade",
      });
    }
  }
  Chapter.init(
    {
      name: DataTypes.STRING,
      course_id: DataTypes.INTEGER,
      createdAt: {
        type: DataTypes.DATE,
        field: "created_at",
        allowNull: false,
      },
      updatedAt: {
        type: DataTypes.DATE,
        field: "created_at",
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Chapter",
    }
  );
  return Chapter;
};
