import sequelize from "../../../database/config.js";
import { DataTypes } from "sequelize";

const Device = sequelize.define("Device", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  homeId: {
    type: DataTypes.UUID,
    references: {
      model: "Homes",
      key: "id",
    },
  },
  deviceName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  deviceType: {
    type: DataTypes.ENUM("thermostat", "light", "security_camera"),
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM("on", "off", "idle"),
    allowNull: false,
  }
});

export default Device;
