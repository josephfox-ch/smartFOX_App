import "./loadEnv.js";
import "./src/api/models/index.js";
import "./src/config/logger.js";
import "./src/config/db.js";
import { connectDB } from "./src/config/db.js";
import logger from "./src/config/logger.js";
import app from "./src/app.js";

const PORT = process.env.EXPRESS_PORT || 3000;

connectDB()
  .then(async () => {
    app.listen(PORT, () => {
      logger.info(`Server is running on port ${PORT} `);
    });
  })
  .catch((error) => {
    logger.error("Database Connection Error " + error.message);
    process.exit(1);
  });

  