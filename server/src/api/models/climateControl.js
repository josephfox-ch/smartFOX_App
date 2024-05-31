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
    defaultValue:18,
    allowNull: true,
   
  },
  currentTemperature: {
    type: DataTypes.FLOAT,
    allowNull: true, 
  },
  status:{
    type: DataTypes.ENUM,
    values: ['on', 'off', 'error'],
    defaultValue:'off',
    allowNull: false,
  },
  mode: {
    type: DataTypes.ENUM,
    values: ['heating', 'cooling', 'away'],
    defaultValue:'away',
    allowNull: false,
  },
});

export default ClimateControl;

