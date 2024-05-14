import { Home } from '../models/index.js'; 
import logger from '../../config/logger.js';

export const getHomes = async (userId) => {
  try {
    const homes = await Home.findAll({ where: { userId } });
    return homes;
  } catch (error) {
    logger.error(`Error retrieving homes for user ${userId}: ${error.message}`);
    throw new Error('Could not retrieve homes');
  }
};

export const createHome = async (userId, homeData) => {
  try {
    const { name, streetAddress, city, country, postalCode, timeZone,latitude,longitude } = homeData;
    const newHome = await Home.create({
      userId,
      name,
      streetAddress,
      city,
      country,
      postalCode,
      timeZone,
      latitude,
      longitude,
    });
    logger.info(`Home created for user ${userId}: ${newHome.id}`);
    return newHome;
  } catch (error) {
    logger.error(`Error creating home for user ${userId}: ${error.message}`);
    throw new Error('Could not create home');
  }
};

export const updateHome = async (userId, homeId, homeData) => {
  try {
    const { houseName, streetAddress, city, country, postalCode, timeZone } = homeData;
    const [updated] = await Home.update(
      {
        houseName,
        streetAddress,
        city,
        country,
        postalCode,
        timeZone
      },
      {
        where: {
          id: homeId,
          userId
        }
      }
    );

    if (!updated) {
      throw new Error('Home not found or user unauthorized');
    }

    const updatedHome = await Home.findOne({ where: { id: homeId } });
    logger.info(`Home updated for user ${userId}: ${homeId}`);
    return updatedHome;
  } catch (error) {
    logger.error(`Error updating home for user ${userId}: ${error.message}`);
    throw new Error('Could not update home');
  }
};

export const deleteHome = async (userId, homeId) => {
  try {
    const deleted = await Home.destroy({
      where: {
        id: homeId,
        userId
      }
    });

    if (!deleted) {
      throw new Error('Home not found or user unauthorized');
    }

    logger.info(`Home deleted for user ${userId}: ${homeId}`);
    return { message: 'Home deleted successfully' };
  } catch (error) {
    logger.error(`Error deleting home for user ${userId}: ${error.message}`);
    throw new Error('Could not delete home');
  }
};
