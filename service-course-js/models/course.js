"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Course extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Course.belongsTo(models.Mentor, {
        foreignKey: "mentor_id",
        sourceKey: "id",
        as: "mentor_detail",
      });

      Course.hasMany(models.Chapter, {
        foreignKey: "course_id",
        sourceKey: "id",
        as: "chapters",
        onDelete: "cascade",
      });

      Course.hasMany(models.MyCourse, {
        foreignKey: "course_id",
        sourceKey: "id",
        as: "students",
        onDelete: "cascade",
      });

      Course.hasMany(models.Review, {
        foreignKey: "course_id",
        sourceKey: "id",
        as: "reviews",
        onDelete: "cascade",
      });
    }
  }
  Course.init(
    {
      name: DataTypes.STRING,
      certificate: DataTypes.BOOLEAN,
      thumbnail: DataTypes.STRING,
      type: DataTypes.ENUM("free", "premium"),
      status: DataTypes.ENUM("draft", "published"),
      price: DataTypes.INTEGER,
      level: DataTypes.ENUM("all level", "beginner", "intermediate", "advance"),
      description: DataTypes.TEXT,
      mentor_id: DataTypes.INTEGER,
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
      modelName: "Course",
      tableName: "courses",
    }
  );
  return Course;
};
