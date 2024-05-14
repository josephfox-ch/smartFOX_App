import { DataTypes } from "sequelize";
import sequelize from "../../config/db.js";

const RoomTemperature = sequelize.define("RoomTemperature", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  roomId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: "Rooms",
      key: "id",
    }},
  temperature: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  recordedAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
});

export default RoomTemperature;
