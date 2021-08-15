"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Mentor extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Mentor.hasMany(models.Course, {
        foreignKey: "mentor_id",
        sourceKey: "id",
        as: "courses",
        onDelete: "cascade",
      });
    }
  }
  Mentor.init(
    {
      name: DataTypes.STRING,
      profile: DataTypes.STRING,
      email: DataTypes.STRING,
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        field: "created_at",
      },
      updatedAt: {
        field: "updated_at",
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Mentor",
      tableName: "mentors",
    }
  );
  return Mentor;
};
