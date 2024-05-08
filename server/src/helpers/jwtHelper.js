import jwt from "jsonwebtoken";
import logger from "../config/logger.js";

export const generateSessionToken = async (user) => {
  const payload = {
    id: user.id,
    email: user.email,
  };
  try {
    const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
      algorithm: "HS256",
      allowInsecureKeySizes: true,
      expiresIn: process.env.JWT_SESSION_EXPIRATION,
    });
    logger.info(`Token generated for user ${user.id}`);
    return token;
  } catch (error) {
    logger.error(
      `Error generating token for user ${user.id}: ${error.message}`
    );
    throw new Error("Token generation failed.");
  }
};

export const generateAccessToken = async (user) => {
  const payload = {
    id: user.id,
    email: user.email,
  };
  try {
    const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
      algorithm: "HS256",
      allowInsecureKeySizes: true,
      expiresIn: process.env.JWT_ACCESS_EXPIRATION,
    });
    logger.info(`Access token generated for user ${user.id}`);
    return token;
  } catch (error) {
    logger.error(
      `Error generating access token for user ${user.id}: ${error.message}`
    );
    throw new Error("Token generation failed.");
  }
};

export const verifyToken = async (token) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    logger.info("Token verified successfully.");
    return decoded;
  } catch (error) {
    logger.warn(`Token verification failed: ${error.message}`);
    return null;
  }
};
