import { verifyToken } from '../helpers/jwtHelper';

export const authenticateUser = (req, res, next) => {
  const token = req.session.token;
  const decoded = verifyToken(token);
  if (decoded) {
    req.user = decoded;
    next();
  } else {
    res.status(401).send({ message: 'Unauthorized' });
  }
};


