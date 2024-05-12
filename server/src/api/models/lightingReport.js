import { DataTypes } from "sequelize";
import sequelize from "../../config/db.js";

const LightingReport = sequelize.define("LightingReport", {
  reportId: {
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
  date: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  usageDuration: {
    type: DataTypes.FLOAT, // In hours
    allowNull: false,
  },
  energyConsumed: {
    type: DataTypes.FLOAT, // In kWh
    allowNull: false,
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
