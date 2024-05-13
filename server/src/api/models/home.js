import sequelize from "../../config/db.js";
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
    allowNull: false,
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  streetAddress: {
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
    allowNull: true,
  },
  timeZone: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  smartSystemStartDate: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
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

export default Home;

