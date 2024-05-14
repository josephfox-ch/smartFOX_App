import { DataTypes } from "sequelize";
import sequelize from "../../config/db.js";

const LightingControl = sequelize.define("LightingControl", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  roomId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: "Rooms",
      key: "id",
    },
  },
  name:{
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM,
    values: ["on", "off"],
    allowNull: false,
  },
  brightnessLevel: {
    type: DataTypes.INTEGER,
    allowNull: true,
    validate: {
      min: 0,
      max: 100,
    },
  },
});

export default LightingControl;
