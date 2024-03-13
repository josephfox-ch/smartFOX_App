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
    

    moveOutDate: {
      type: DataTypes.DATE,
      allowNull: true,
      comment: "The date when the user moved out of the home",
    },
    
    
  },
  {
    timestamps: true,
    tableName: "UserHomes",
    modelName: "UserHome",
  }
);

export default UserHome;
