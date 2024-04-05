import passport from "../../config/passport.js";
import { auth } from "express-oauth2-jwt-bearer";

const auth0Check = auth({
  audience: "https://smartfoxhome.com/api",
  issuerBaseURL: "https://dev-q6sl7tm1jcbjck1h.eu.auth0.com/",
  tokenSigningAlg: "RS256",
});

export const flexibleAuth = (req, res, next) => {
  auth0Check(req, res, (nextError) => {
    if (!nextError) return next();

    passport.authenticate("jwt", { session: false }, (error, user, info) => {
      if (error) return next(error);
      if (user) {
        req.user = user;
        return next();
      }

      return res.status(401).json({ message: "Unauthorized" });
    })(req, res, next);
  });
};
