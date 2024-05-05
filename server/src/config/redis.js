import session from "express-session";
import RedisStore from "connect-redis";
import { createClient } from "redis";
import logger from '../config/logger.js'
import app from "../app.js";

const redisClient = createClient({
  url: process.env.REDIS_URL,
});
redisClient.connect()
.then(() => {
  logger.info('Connected to Redis successfully.');
  app.set('redis', redisClient);
})
.catch(error => {
  logger.error('Failed to connect to Redis:', error);
});

redisClient.on('error', (err) => {
logger.error('Redis Client Error', err);
});

const redisStore = new RedisStore({
  client: redisClient,
  prefix: "SmartFOX:",
});

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
