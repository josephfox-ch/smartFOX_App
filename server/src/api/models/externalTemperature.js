import { DataTypes } from "sequelize";
import sequelize from "../../config/db.js";

const ExternalTemperature = sequelize.define("ExternalTemperature", {
  externalTemperatureId: {
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
  },
  temperature: DataTypes.FLOAT,
  timestamp: DataTypes.DATE,
});

export default ExternalTemperature;
