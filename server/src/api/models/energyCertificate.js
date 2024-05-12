import { DataTypes } from "sequelize";
import sequelize from "../../config/db.js";

const EnergyCertificate = sequelize.define("EnergyCertificate", {
  energyCertificateId: {
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
  buildingVolume: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  heatLossCoefficient: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  additionalHeatSources: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  heatingSystemDetails: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  insulationQuality: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  constructionYear: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  renewalDate: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  outdoorAirTemperature: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  indoorTemperature: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  globalHeatLossCoefficient: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  volumeOfHeatedZone: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  heatEmissionCoefficient: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  freeHeatGains: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
});

export default EnergyCertificate;
