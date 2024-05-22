import { DataTypes } from "sequelize";
import sequelize from "../../config/db.js";

const LightingControl = sequelize.define("LightingControl", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  homeId: {
    type: DataTypes.UUID,
    allowNull: true,
    references: {
      model: "Homes",
      key: "id",
    },
  },
  roomId: {
    type: DataTypes.UUID,
    allowNull: true,
    references: {
      model: "Rooms",
      key: "id",
    },
  },
  name: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  status: {
    type: DataTypes.ENUM,
    values: ["on", "off"],
    defaultValue: "off",
    allowNull: true,
  },
  brightnessLevel: {
    type: DataTypes.INTEGER,
    allowNull: true,
    validate: {
      min: 0,
      max: 100,
    },
  },
});

export default LightingControl;

