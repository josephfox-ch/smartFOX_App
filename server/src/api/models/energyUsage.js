import { DataTypes } from "sequelize";
import sequelize from "../../config/db.js";

const EnergyUsage = sequelize.define("EnergyUsage", {
  usageId: {
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
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  energyConsumed: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
});

export default EnergyUsage;
