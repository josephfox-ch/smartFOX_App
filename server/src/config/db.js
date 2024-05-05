import Sequelize from "sequelize";
import logger from "./logger.js";

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: process.env.DB_DIALECT,
    logging: (msg) => {
      if (msg.includes("Error")) {
        console.log(msg);
      }
    },
  }
);

export const connectDB = async () => {
  try {
    await sequelize.authenticate();
    logger.info("Database connection has been established successfully.");
    await sequelize.sync({
      force: process.env.SEQUELIZE_FORCE,
      alter: process.env.SEQUELIZE_ALTER,
    });
    logger.info("Database has been synced.");
  } catch (error) {
    logger.error("Unable to connect to Database", error);
    throw error;
  }
};

export default sequelize;
