import sequelize from '../../../database/config.js'
import { DataTypes } from 'sequelize'
import {v4 as uuidv4} from 'uuid';

const Home = sequelize.define("Home", {
    id: {
      type: DataTypes.UUID,
      defaultValue: uuidv4,
      primaryKey: true,
    },
    buildingFeatures: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    buildingVolume: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    heatingSystemDetails: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    indoorTemperaturePreference: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    outdoorTemperature: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    currentWaterFlowTemperature: {
      type: DataTypes.FLOAT,
      allowNull: true, 
    },
    additionalHeatSources: {
      type: DataTypes.TEXT,
      allowNull: true, 
    },
    userId: {
      type: DataTypes.UUID,
      references: {
        model: 'Users', 
        key: 'id',
      }
    },
  });

  export default Home;
  