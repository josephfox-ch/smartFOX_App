import jwt from "jsonwebtoken";
import { RefreshToken } from "../api/models/index.js";
import { Op } from "sequelize";
import logger from "../config/logger.js";


export const generateToken = (user) => {
  const payload = {
    id: user.id,
    email: user.email
  };
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '180 days' });
};

export const verifyToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    return null;
  }
};
function generateTokens(user) {
    const accessToken = jwt.sign(
        { userId: user.id, email: user.email },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: process.env.ACCESS_TOKEN_EXPIRATION }
    );

    const refreshToken = jwt.sign(
        { userId: user.id },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: process.env.REFRESH_TOKEN_EXPIRATION }
    );

    return { accessToken, refreshToken };
}

function verifyAccessToken(token) {
    try {
        return { isValid: true, payload: jwt.verify(token, process.env.ACCESS_TOKEN_SECRET) };
    } catch (error) {
        return { isValid: false, error };
    }
}

function verifyRefreshToken(token) {
    try {
        return { isValid: true, payload: jwt.verify(token, process.env.REFRESH_TOKEN_SECRET) };
    } catch (error) {
        return { isValid: false, error };
    }
}

async function cleanExpiredTokens() {
    await RefreshToken.destroy({
        where: {
            expiryDate: { [Op.lt]: new Date() }
        }
    });
}

export { generateTokens, verifyAccessToken, verifyRefreshToken,cleanExpiredTokens};





