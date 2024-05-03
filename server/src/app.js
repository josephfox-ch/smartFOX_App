import express from "express";
import cors from "cors";
import morgan from "morgan";
import session from "express-session";
import RedisStore from "connect-redis";
import { createClient } from "redis";
import cookieParser from 'cookie-parser';
import passport from "./config/passport.js";
import userRoutes from "./api/routes/userRoutes.js";
// import homeRoutes from './api/routes/homeRoutes.js';
import authRoutes from "./api/routes/authRoutes.js";

const app = express();

const redisClient = createClient();
redisClient.connect().catch(console.error);

const redisStore = new RedisStore({
  client: redisClient,
  prefix: "smartFOX:",
});

redisClient.on('error', (err) => console.log('Redis Client Error', err));
redisClient.on('connect', () => console.log('Connected to Redis'));


//todo: app.use(cors()); !!!
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());
app.use(passport.initialize());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use(
  session({
    store: redisStore,
    name: "smartFOX-session",
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false, //todo: change secure to 'true' for production
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    },
  })
);

app.use("/api/v1/users", userRoutes);
// app.use('/api/v1/homes', homeRoutes);
app.use("/api/v1/auth", authRoutes);

export default app;
