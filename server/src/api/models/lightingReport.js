import { DataTypes } from "sequelize";
import sequelize from "../../config/db.js";

const LightingReport = sequelize.define("LightingReport", {
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
  date: {
    type: DataTypes.DATE,
    allowNull: true,
    defaultValue: DataTypes.NOW,
  },
  usageDuration: {
    type: DataTypes.FLOAT, // In hours
    allowNull: true,
  },
  energyConsumed: {
    type: DataTypes.FLOAT, // In kWh
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

export default LightingReport;
