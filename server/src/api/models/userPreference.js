import sequelize from "../../config/db.js";
import { DataTypes } from "sequelize";

const UserPreferences = sequelize.define("UserPreferences", {
  preferenceId: {
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
    allowNull: false,
    references: {
      model: "Homes",
      key: "id",
    },
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  },
  preferredTemperature: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  preferredMode: {
    type: DataTypes.ENUM,
    values: ["day", "night", "away", "manual"],
    allowNull: false,
  },
  acceptEmails: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    allowNull: true,
  },
  acceptTerms: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    allowNull: false,
  },
  acceptCookies: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    allowNull: false,
  },
});

export default UserPreferences;
