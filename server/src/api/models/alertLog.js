import { DataTypes } from "sequelize";
import sequelize from "../../config/db.js";

const AlertLog = sequelize.define("AlertLog", {
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
    }
  },
  message: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  severity: {
    type: DataTypes.ENUM,
    values: ['low', 'medium', 'high', 'critical'],
    defaultValue:'low',
    allowNull: true,
  }
});

export default AlertLog;
