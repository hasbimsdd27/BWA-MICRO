"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class MyCourse extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      MyCourse.belongsTo(models.Course, {
        foreignKey: "course_id",
        sourceKey: "id",
      });
    }
  }
  MyCourse.init(
    {
      course_id: DataTypes.INTEGER,
      user_id: DataTypes.INTEGER,
      createdAt: {
        field: "created_at",
        type: DataTypes.DATE,
        allowNull: false,
      },
      updatedAt: {
        field: "updated_at",
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "MyCourse",
      tableName: "my_courses",
    }
  );
  return MyCourse;
};
