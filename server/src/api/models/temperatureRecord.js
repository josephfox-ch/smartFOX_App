import { DataTypes } from "sequelize";
import sequelize from "../../config/db.js";

const TemperatureRecord = sequelize.define("TemperatureRecord", {
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
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  },
  indoorTemperature: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  outdoorTemperature: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  recordedAt: {
    type: DataTypes.DATE,
    allowNull: true,
    defaultValue: DataTypes.NOW,
  },
});

export default TemperatureRecord;
