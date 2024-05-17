import { DataTypes } from "sequelize";
import sequelize from "../../config/db.js";

const ClimateControl = sequelize.define("ClimateControl", {
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
  desiredTemperature: {
    type: DataTypes.FLOAT,
    allowNull: false,
   
  },
  currentTemperature: {
    type: DataTypes.FLOAT,
    allowNull: false,
   
  },
  waterFlowTemperature: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  mode: {
    type: DataTypes.ENUM,
    values: ['heating', 'cooling', 'away'],
    allowNull: false,
  },
});

export default ClimateControl;

