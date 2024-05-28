import "./loadEnv.js";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import { sessionMiddleware } from "./src/api/middlewares/sessionMiddleware.js";
import { useRoutes } from "./src/api/routes/routes.js";
import logger from "./src/config/logger.js";
import expressWinston from "express-winston";
import errorHandler from "./src/api/middlewares/errorHandler.js";
import "./src/api/models/index.js";
import { connectDB } from "./src/config/db.js";

const app = express();

const corsOptions = {
  origin: process.env.CORS_ORIGIN,  
  credentials: true,
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

app.use(helmet());
app.use(helmet.contentSecurityPolicy({
  directives: {
    defaultSrc: ["'self'"],
    scriptSrc: ["'self'", "'unsafe-inline'"],
    styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
    fontSrc: ["'self'", "https://fonts.gstatic.com"],
    imgSrc: ["'self'", "data:"],
    connectSrc: ["'self'", 'https://localhost:5173'],
    frameSrc: ["'none'"],
    objectSrc: ["'none'"],
    upgradeInsecureRequests: [],
  },
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(sessionMiddleware);
useRoutes(app);

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

  