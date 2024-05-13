import { DataTypes } from "sequelize";
import sequelize from "../../config/db.js";

const AccessControl = sequelize.define("AccessControl", {
  id: {
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
    values: ["parents", "children", "guest"], //todo: manage permissions
    defaultValue: "children",
    allowNull: false,
  },
});

export default AccessControl;
