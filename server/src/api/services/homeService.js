import { Home, EnergyCertificate,ClimateControl } from "../models/index.js";
import sequelize from "../../config/db.js";
import logger from "../../config/logger.js";

export const getHomes = async (userId) => {
  try {
    const homes = await Home.findAll({ where: { userId } });
    return homes;
  } catch (error) {
    logger.error(`Error retrieving homes for user ${userId}: ${error.message}`);
    throw new Error("Could not retrieve homes");
  }
};

export const createHomeWithEnergyCertificate = async (userId, homeData, energyCertificateData) => {
  const transaction = await sequelize.transaction();
  try {
    const {
      name,
      streetAddress,
      city,
      country,
      postalCode,
      timeZone,
      latitude,
      longitude,
    } = homeData;

    const newHome = await Home.create(
      {
        userId,
        name,
        streetAddress,
        city,
        country,
        postalCode,
        timeZone,
        latitude,
        longitude,
      },
      { transaction }
    );

    logger.info(`Home created for user ${userId}: ${newHome.id}`);

    const newEnergyCertificate = await EnergyCertificate.create(
      {
        homeId: newHome.id,
        ...energyCertificateData,
      },
      { transaction }
    );

    logger.info(
      `Energy certificate created for home ${newHome.id}: ${newEnergyCertificate.id}`
    );

    
    const defaultClimateControl = {
      homeId: newHome.id,
      desiredTemperature: 22,
      currentTemperature: 22,
      mode: 'away',
    };

    const newClimateControl = await ClimateControl.create(defaultClimateControl, { transaction });

    logger.info(`ClimateControl created for home ${newHome.id}: ${newClimateControl.id}`);

    await transaction.commit();
    return {
      ...newHome.toJSON(),
      energyCertificate: newEnergyCertificate,
      climateControl: newClimateControl,
    };
  } catch (error) {
    await transaction.rollback();
    logger.error(
      `Error creating home, energy certificate, and climate control for user ${userId}: ${error.message}`
    );
    throw new Error('Could not create home, energy certificate, and climate control');
  }
};

export const updateHome = async (userId, homeId, homeData) => {
  try {
    const { houseName, streetAddress, city, country, postalCode, timeZone } =
      homeData;
    const [updated] = await Home.update(
      {
        houseName,
        streetAddress,
        city,
        country,
        postalCode,
        timeZone,
      },
      {
        where: {
          id: homeId,
          userId,
        },
      }
    );

    if (!updated) {
      throw new Error("Home not found or user unauthorized");
    }

    const updatedHome = await Home.findOne({ where: { id: homeId } });
    logger.info(`Home updated for user ${userId}: ${homeId}`);
    return updatedHome;
  } catch (error) {
    logger.error(`Error updating home for user ${userId}: ${error.message}`);
    throw new Error("Could not update home");
  }
};

export const deleteHome = async (userId, homeId) => {
  try {
    const deleted = await Home.destroy({
      where: {
        id: homeId,
        userId,
      },
    });

    if (!deleted) {
      throw new Error("Home not found or user unauthorized");
    }

    logger.info(`Home deleted for user ${userId}: ${homeId}`);
    return { message: "Home deleted successfully" };
  } catch (error) {
    logger.error(`Error deleting home for user ${userId}: ${error.message}`);
    throw new Error("Could not delete home");
  }
};
