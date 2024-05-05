import sequelize from "../../config/db.js";
import { DataTypes } from "sequelize";
import { v4 as uuidv4 } from "uuid";

const OTP = sequelize.define("OTP", {
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  otp: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  expiresAt: {
    type: DataTypes.DATE,
    allowNull: false,
  },
});

export default OTP;
