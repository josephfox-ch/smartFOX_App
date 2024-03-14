import Sequelize from 'sequelize';
import OTP from '../api/models/otp.js'

export const generateOTP = () => {
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
