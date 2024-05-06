import { verifyToken } from '../helpers/jwtHelper';
import logger from '../config/logger';

export const authenticateUser = (req, res, next) => {
  const token = req.session.token;
  if (!token) {
    logger.warn("No token provided in session.");
    return res.status(401).send({ message: 'Unauthorized: No token provided' });
  }

  const decoded = verifyToken(token);
  if (decoded) {
    req.user = decoded;
    logger.info(`Token verified for user: ${decoded.id}`);
    next();
  } else {
    logger.error("Invalid token provided.");
    res.status(401).send({ message: 'Unauthorized: Invalid token' });
  }
};



