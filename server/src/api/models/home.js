import sequelize from '../../../database/config.js';
import { DataTypes } from 'sequelize';
import { v4 as uuidv4 } from 'uuid';

const Home = sequelize.define("Home", {
  id: {
    type: DataTypes.UUID,
    defaultValue: uuidv4,
    primaryKey: true,
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  city: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  region: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  postalCode: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  latitude: {
    type: DataTypes.DOUBLE,
    allowNull: true,
  },
  longitude: {
    type: DataTypes.DOUBLE,
    allowNull: true,
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
    },
  },
});

export default Home;

  