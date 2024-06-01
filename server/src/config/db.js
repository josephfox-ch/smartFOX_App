import { Sequelize } from "sequelize";
import logger from "./logger.js";
import pg from "pg";

const options = {
  host: process.env.POSTGRES_HOST,
  port: process.env.POSTGRES_PORT,
  dialect: "postgres",
  dialectModule: pg,
  logging: (msg) => {
    if (msg.includes("Error")) {
      console.log(msg);
    }
  },
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false, 
    },
  },
};

const sequelize = new Sequelize(
  process.env.POSTGRES_DATABASE,
  process.env.POSTGRES_USER,
  process.env.POSTGRES_PASSWORD,
  options
);

export const connectDB = async () => {
  try {
    await sequelize.authenticate();
    logger.info("Database connection has been established successfully.");
    await sequelize.sync({
      force:
        process.env.NODE_ENV === "development" &&
        process.env.SEQUELIZE_FORCE === "true",
      alter:
        process.env.NODE_ENV !== "production" &&
        process.env.SEQUELIZE_ALTER === "true",
    });
    logger.info("Database has been synced.");
  } catch (error) {
    logger.error("Unable to connect to Database", error);
    throw error;
  }
};

export default sequelize;

