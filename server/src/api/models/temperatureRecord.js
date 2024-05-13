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
    allowNull: false,
  },
  outdoorTemperature: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  recordedAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
});

export default TemperatureRecord;
