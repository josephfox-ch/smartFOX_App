import sequelize from "../../../database/config.js";
import { DataTypes } from "sequelize";

const Event = sequelize.define("Event", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  deviceId: {
    type: DataTypes.UUID,
    references: {
      model: "Devices",
      key: "id",
    },
  },
  eventType: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  eventDescription: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  timestamp: DataTypes.DATE,
});

export default Event;
