import sequelize from "../../../database/config.js";
import { DataTypes } from "sequelize";

const UserPreferences = sequelize.define("UserPreferences", {
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
  },
  acceptEmails: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    allowNull: true,
  },
  acceptTerms: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    allowNull: true,
  },
  acceptCookies: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    allowNull: true,
  },
  securityQuestion: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  securityAnswer: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

export default UserPreferences;
