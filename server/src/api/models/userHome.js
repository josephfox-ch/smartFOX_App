import { DataTypes } from "sequelize";
import sequelize from "../../../database/config.js";

const UserHome = sequelize.define(
  "UserHome",
  {
    moveInDate: {
      type: DataTypes.DATE,
      allowNull: false,
      comment: "The date when the user moved into the home",
    },
    smartSystemStartDate: {
      type: DataTypes.DATE,
      allowNull: true,
      comment: "The date when the home started using the smartFoX system",
    },

    moveOutDate: {
      type: DataTypes.DATE,
      allowNull: true,
      comment: "The date when the user moved out of the home",
    },
    smartSystemEndDate: {
      type: DataTypes.DATE,
      allowNull: true,
      comment: "The date when the home stopped using the smartFoX system",
    },

    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      comment: "Indicates whether the relationship is currently active",
    },
  },
  {
    timestamps: true,
    tableName: "UserHomes",
    modelName: "UserHome",
  }
);

export default UserHome;
