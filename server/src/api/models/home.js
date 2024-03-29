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
//   id: {
//     type: DataTypes.UUID,
//     defaultValue: uuidv4,
//     primaryKey: true,
//   },
//   address: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
//   city: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
//   region: {
//     type: DataTypes.STRING,
//     allowNull: true,
//   },
//   postalCode: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
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
//   buildingVolume: {
//     type: DataTypes.FLOAT,
//     allowNull: false,
//   },
//   heatingSystemDetails: {
//     type: DataTypes.TEXT,
//     allowNull: false,
//   },
//   indoorTemperaturePreference: {
//     type: DataTypes.FLOAT,
//     allowNull: false,
//   },
//   outdoorTemperature: {
//     type: DataTypes.FLOAT,
//     allowNull: false,
//   },
//   currentWaterFlowTemperature: {
//     type: DataTypes.FLOAT,
//     allowNull: true,
//   },
//   additionalHeatSources: {
//     type: DataTypes.TEXT,
//     allowNull: true,
//   },
//   userId: {
//     type: DataTypes.UUID,
//     references: {
//       model: "Users",
//       key: "id",
//     },
//   },
//   smartSystemStartDate: {
//     type: DataTypes.DATE,
//     allowNull: true,
//     comment: "The date when the home started using the smartFoX system",
//   },
//   smartSystemEndDate: {
//     type: DataTypes.DATE,
//     allowNull: true,
//     comment: "The date when the home stopped using the smartFoX system",
//   },
//   isActive: {
//     type: DataTypes.BOOLEAN,
//     defaultValue: true,
//     comment: "Indicates whether the relationship is currently active",
//   },
// });

export default Home;
