import "./loadEnv.js";
import "./src/config/firebase.js";
import express from "express";
import cookieParser from "cookie-parser"; 
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import fs from "fs";
import path from "path";
import { useRoutes } from "./src/api/routes/routes.js";
import logger from "./src/config/logger.js";
import expressWinston from "express-winston";
import errorHandler from "./src/api/middlewares/errorHandler.js";
import "./src/api/models/index.js";
import { connectDB } from "./src/config/db.js";
import allowCors from "./allowCors.js";

const app = express();


if (process.env.NODE_ENV !== "production") {
  const logDir = path.resolve("logs");
  if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir);
  }
}

const corsOptions = {
  origin: process.env.CORS_ORIGIN.split(','),
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cookieParser());
app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

app.use(helmet());


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));


useRoutes(app);

app.use((req, res, next) => {
  allowCors(next)(req, res);
});

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
  process.exit(1);
});

app.use(errorHandler);

const PORT = process.env.EXPRESS_PORT || 3000;

connectDB()
  .then(async () => {
    app.listen(PORT, () => {
      logger.info(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    logger.error("Database Connection Error " + error.message);
    process.exit(1);
  });

export default app;

  