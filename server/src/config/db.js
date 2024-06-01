import { Sequelize } from "sequelize";
import logger from "./logger.js";

const options = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  dialect: 'postgres',
  logging: (msg) => {
    if (msg.includes("Error")) {
      console.log(msg);
    }
  },
};

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  options
);

export const connectDB = async () => {
  try {
    await sequelize.authenticate();
    logger.info("Database connection has been established successfully.");
    await sequelize.sync({
      force: process.env.NODE_ENV === 'development' && process.env.SEQUELIZE_FORCE === 'true',
      alter: process.env.NODE_ENV !== 'production' && process.env.SEQUELIZE_ALTER === 'true',
    });
    logger.info("Database has been synced.");
  } catch (error) {
    logger.error("Unable to connect to Database", error);
    throw error;
  }
};

export default sequelize;
