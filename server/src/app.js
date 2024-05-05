import express from "express";
import cors from "cors";
import session from "express-session";
import RedisStore from "connect-redis";
import morgan from "morgan";
import { createClient } from "redis";
import passport from "./config/passport.js";
import userRoutes from "./api/routes/userRoutes.js";
import authRoutes from "./api/routes/authRoutes.js";
import logger from "./config/logger.js";
import expressWinston from "express-winston";
import errorHandler from "./api/middlewares/errorHandler.js";

const app = express();

if (process.env.NODE_ENV === "development") {
  app.use(morgan(process.env.ACCESS_LOG_FORMAT));
}

const redisClient = createClient({
  url: process.env.REDIS_URL,
});
redisClient.connect().catch(console.error);

const redisStore = new RedisStore({
  client: redisClient,
  prefix: "SmartFOX:",
});

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use(passport.initialize());

app.use(
  session({
    store: redisStore,
    name: process.env.SESSION_NAME,
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.SECURE_COOKIES === "true",
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    },
  })
);

app.use(
  expressWinston.logger({
    winstonInstance: logger,
    msg: "HTTP {{req.method}} {{req.url}}",
    expressFormat: true,
    colorize: true,
    ignoreRoute: () => false,
  })
);

app.use("/api/v1/users", userRoutes);
app.use("/api/v1/auth", authRoutes);

process.on("uncaughtException", (err) => {
  logger.error(`Uncaught Exception ${err.message}`);
  process.exit(0);
});

app.use(errorHandler);

export default app;
