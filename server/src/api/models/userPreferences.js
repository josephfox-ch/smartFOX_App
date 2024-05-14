import sequelize from "../../config/db.js";
import { DataTypes } from "sequelize";

const UserPreferences = sequelize.define("UserPreferences", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: "Users",
      key: "id",
    },
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  },
  homeId: {
    type: DataTypes.UUID,
    allowNull: true,
    references: {
      model: "Homes",
      key: "id",
    },
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  },
  preferredTemperature: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  preferredMode: {
    type: DataTypes.ENUM,
    values: ["day", "night", "away", "manual"],
    allowNull: true,
  },
  acceptEmails: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    allowNull: true,
  },
  acceptTerms: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  acceptCookies: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
});

export default UserPreferences;
