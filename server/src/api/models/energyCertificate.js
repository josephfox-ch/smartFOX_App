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
  insulationQuality: DataTypes.STRING,
  heatLossCoefficient: DataTypes.FLOAT,
  constructionYear: DataTypes.INTEGER,
  renewalDate: DataTypes.DATE,
});

export default EnergyCertificate;
