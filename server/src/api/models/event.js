import sequelize from "../../config/db.js";
import { DataTypes } from "sequelize";

const Event = sequelize.define("Event", {
  eventId: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  deviceId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: "Devices",
      key: "id",
    },
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  },
  eventType: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  eventDescription: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  timestamp: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
});

export default Event;

