"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ImageCourse extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      ImageCourse.belongsTo(models.Course, {
        foreignKey: "course_id",
        sourceKey: "id",
      });
    }
  }
  ImageCourse.init(
    {
      image: DataTypes.STRING,
      course_id: DataTypes.INTEGER,
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
      modelName: "ImageCourse",
      tableName: "image_courses",
    }
  );
  return ImageCourse;
};
