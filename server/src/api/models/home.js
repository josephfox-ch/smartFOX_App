import sequelize from "../../../database/config.js";
import { DataTypes } from "sequelize";

const Home = sequelize.define("Home", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.UUID,
    references: {
      model: "Users",
      key: "id",
    },
  },
  homeName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  postalCode: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  city: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  country: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  timeZone: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  smartSystemStartDate: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  smartSystemEndDate: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
});

// const Home = sequelize.define("Home", {

//   latitude: {
//     type: DataTypes.DOUBLE,
//     allowNull: true,
//   },
//   longitude: {
//     type: DataTypes.DOUBLE,
//     allowNull: true,
//   },
//   buildingFeatures: {
//     type: DataTypes.TEXT,
//     allowNull: false,
//   },






export default Home;
