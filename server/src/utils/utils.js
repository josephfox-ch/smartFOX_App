import Sequelize from "sequelize";
import OTP from "../api/models/otp.js";

export const generateOTP = async() => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

export const saveOTPForUser = async (userId, otp) => {
  const expiryTime = new Date();
  expiryTime.setMinutes(expiryTime.getMinutes() + 10);
  await OTP.create({
    userId,
    otp,
    expiresAt: expiryTime,
  });
};

export const checkOTPForUser = async (userId, inputOtp) => {
  const otpRecord = await OTP.findOne({
    where: {
      userId,
      expiresAt: {
        [Sequelize.Op.gt]: new Date(),
      },
    },
    order: [["createdAt", "DESC"]],
  });

  if (!otpRecord) {
    throw new Error("OTP expired or not found.");
  }

  if (otpRecord.otp !== inputOtp) {
    throw new Error("Invalid OTP.");
  }

  await otpRecord.destroy();

  return true;
};

export function setCookie(res, name, value, options) {
  const defaults = {
    httpOnly: true,
    secure: process.env.NODE_ENV,
    sameSite: "Strict",
    path: "/",
    //todo:  domain: 'example.com',
  };

  const finalOptions = { ...defaults, ...options };

  res.cookie(name, value, finalOptions);
}

export async function cleanExpiredOtps() {
  try {
    const expiredOTP = await OTP.findAll({
      where: {
        expiresAt: {
          [Op.lt]: new Date(),
        },
      },
    });

    await OTP.destroy({
      where: {
        id: expiredOTP.map((otp) => otp.id),
      },
    });

    console.log("Expired OTPs deleted successfully.");
  } catch (error) {
    console.error("Error deleting expired OTPs:", error);
  }
}
