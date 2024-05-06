import express from "express";
import cors from "cors";
import morgan from "morgan";
import {authenticateUser} from "./api/middlewares/authMiddleware.js";
import { sessionMiddleware } from "./api/middlewares/sessionMiddleware.js";
import { useRoutes } from "./api/routes/routes.js";
import logger from "./config/logger.js";
import expressWinston from "express-winston";
import errorHandler from "./api/middlewares/errorHandler.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(sessionMiddleware);
app.use(authenticateUser);
useRoutes(app);

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

if (process.env.NODE_ENV === "development") {
  app.use(morgan(process.env.ACCESS_LOG_FORMAT));
}

if (process.env.NODE_ENV === "production") {
  app.use(
    expressWinston.logger({
      winstonInstance: logger,
      msg: "HTTP {{req.method}} {{req.url}}",
      expressFormat: true,
      colorize: true,
      ignoreRoute: () => false,
    })
  );
}


process.on("uncaughtException", (err) => {
  logger.error(`Uncaught Exception ${err.message}`);
  process.exit(0);
});

app.use(errorHandler);

export default app;
