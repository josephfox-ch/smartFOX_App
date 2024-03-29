import { DataTypes } from "sequelize";
import sequelize from "../../../database/config.js";

const AccessControl = sequelize.define("AccessControl", {
  accessId: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  homeId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: "Homes",
      key: "id",
    },
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: "Users",
      key: "id",
    },
  },
  permissionLevel: {
    type: DataTypes.ENUM,
    values: ["parents", "children", "guest"],
    defaultValue: "children",
    allowNull: false,
  },
});

export default AccessControl;
