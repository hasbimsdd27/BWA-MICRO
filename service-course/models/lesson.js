"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Lesson extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Lesson.belongsTo(models.Chapter, {
        foreignKey: "chapter_id",
        sourceKey: "id",
      });
    }
  }
  Lesson.init(
    {
      name: DataTypes.STRING,
      video: DataTypes.STRING,
      chapter_id: DataTypes.INTEGER,
      createdAt: {
        type: DataTypes.DATE,
        field: "created_at",
        allowNull: false,
      },
      updatedAt: {
        type: DataTypes.DATE,
        field: "updated_at",
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Lesson",
      tableName: "lessons",
    }
  );
  return Lesson;
};
