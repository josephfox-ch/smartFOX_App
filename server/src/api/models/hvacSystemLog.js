import { DataTypes } from "sequelize";
import sequelize from "../../config/db.js";

const HVACSystemLog = sequelize.define("HVACSystemLog", {
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
    }},
  status: {
    type: DataTypes.ENUM,
    values: ['on', 'off', 'maintenance', 'error'],
    allowNull: false,
  },
  startedAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  endedAt: {
    type: DataTypes.DATE,
    allowNull: true,
  },
});

export default HVACSystemLog;
