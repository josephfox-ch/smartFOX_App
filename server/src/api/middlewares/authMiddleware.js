import { verifyToken } from "../../helpers/jwtHelper.js";
import logger from "../../config/logger.js";

export const authenticateUser = async (req, res, next) => {
  console.log('req-cookies',req.cookies);
  const token = req.cookies.token; 
  console.log('token',token);

  if (!token) {
    logger.warn("No token provided in cookies.");
    return res.status(401).send({ message: "Unauthorized: No token provided" });
  }

  try {
    const decoded = await verifyToken(token); 
    req.user = decoded;
    logger.info(`Token verified for user: ${decoded.id}`);
    next();
  } catch (error) {
    logger.error("Invalid token provided.");
    res.status(401).send({ message: "Unauthorized: Invalid token" });
  }
};

