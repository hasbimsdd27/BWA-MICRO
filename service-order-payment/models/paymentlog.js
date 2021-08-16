"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class PaymentLog extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      PaymentLog.belongsTo(models.Order, {
        foreignKey: "order_id",
        sourceKey: "id",
        as: "order",
      });
    }
  }
  PaymentLog.init(
    {
      status: DataTypes.STRING,
      payment_type: DataTypes.STRING,
      raw_response: DataTypes.JSON,
      order_id: DataTypes.INTEGER,
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
      modelName: "PaymentLog",
      tableName: "payment_logs",
    }
  );
  return PaymentLog;
};
