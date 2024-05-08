import { DataTypes } from "sequelize";
import sequelize from "../../config/db.js";

const ClimateControl = sequelize.define("ClimateControl", {
  climateControlId: {
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
  desiredTemperature: DataTypes.FLOAT,
  currentTemperature: DataTypes.FLOAT,
  waterFlowTemperature: DataTypes.FLOAT,
  mode: DataTypes.STRING, //todo:enum -day-night?
  updatedAt: DataTypes.DATE,
});

export default ClimateControl;
