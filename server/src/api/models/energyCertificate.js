import { DataTypes } from "sequelize";
import sequelize from "../../../database/config.js";

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
    allowNull: false,
  },
  heatLossCoefficient: DataTypes.FLOAT,
  additionalHeatSources: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  heatingSystemDetails: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  insulationQuality: DataTypes.STRING,
  constructionYear: DataTypes.INTEGER,
  renewalDate: DataTypes.DATE,
});

export default EnergyCertificate;
