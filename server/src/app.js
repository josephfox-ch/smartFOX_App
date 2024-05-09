import express from "express";
import cors from "cors";
import morgan from "morgan";
import { S3Client, DeleteObjectCommand } from "@aws-sdk/client-s3";
import { createPresignedPost } from "@aws-sdk/s3-presigned-post";
import { sessionMiddleware } from "./api/middlewares/sessionMiddleware.js";
import { useRoutes } from "./api/routes/routes.js";
import logger from "./config/logger.js";
import expressWinston from "express-winston";
import errorHandler from "./api/middlewares/errorHandler.js";

const app = express();

const s3 = new S3Client({
  region: "eu-north-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
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

app.post("/api/v1/upload-avatar", async (req, res) => {
  const { fileName, fileType } = req.body;

  try {
    const deleteParams = {
      Bucket: "smartfoxhome",
      Key: `avatars/${fileName}`,
    };
    await s3.send(new DeleteObjectCommand(deleteParams));
    logger.info(`Deleted previous avatar for user ${fileName}`);

    const s3Params = {
      Bucket: "smartfoxhome",
      Key: `avatars/${fileName}`,
      Expires: 60,
      Conditions: [
        ["content-length-range", 0, 1048576], // Max size 1MB
        ["starts-with", "$Content-Type", fileType],
      ],
      Fields: {
        "Content-Type": fileType,
      },
    };

    const data = await createPresignedPost(s3, s3Params);

    logger.info("Presigned URL generated successfully");
    res.json(data);
  } catch (error) {
    logger.error("Error generating presigned URL", error);
    res.status(500).json({ error: "Error generating presigned URL" });
  }
});

process.on("uncaughtException", (err) => {
  logger.error(`Uncaught Exception ${err.message}`);
  process.exit(0);
});

app.use(errorHandler);

export default app;
