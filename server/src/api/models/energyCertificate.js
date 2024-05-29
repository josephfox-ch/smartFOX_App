import { DataTypes } from "sequelize";
import sequelize from "../../config/db.js";

const EnergyCertificate = sequelize.define("EnergyCertificate", {
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
  },
  buildingArea: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  constructionYear: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  windowArea: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  windowUValue: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  wallArea: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  wallUValue: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  boilerEfficiency: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  boilerCapacity: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  waterMass: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  fuelType: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  insulationQuality: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

export default EnergyCertificate;


