import { Home, ClimateControl, EnergyCertificate, Device, Event, EnergyUsage, TemperatureRecord, HVACSystemLog, AlertLog, Room, LightingControl, RoomTemperature, LightingReport } from "../models/index.js";
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
    const { name, streetAddress, city, country, postalCode, timeZone, latitude, longitude } = homeData;

    const newHome = await Home.create({ userId, name, streetAddress, city, country, postalCode, timeZone, latitude, longitude }, { transaction });

    logger.info(`Home created for user ${userId}: ${newHome.id}`);

    const newEnergyCertificate = await EnergyCertificate.create({ homeId: newHome.id, ...energyCertificateData }, { transaction });

    logger.info(`Energy certificate created for home ${newHome.id}: ${newEnergyCertificate.id}`);

    const defaultClimateControl = { homeId: newHome.id, desiredTemperature: 22, currentTemperature: 22, mode: 'away' };

    const newClimateControl = await ClimateControl.create(defaultClimateControl, { transaction });

    logger.info(`ClimateControl created for home ${newHome.id}: ${newClimateControl.id}`);

    await transaction.commit();
    return { ...newHome.toJSON(), energyCertificate: newEnergyCertificate, climateControl: newClimateControl };
  } catch (error) {
    await transaction.rollback();
    logger.error(`Error creating home, energy certificate, and climate control for user ${userId}: ${error.message}`);
    throw new Error('Could not create home, energy certificate, and climate control');
  }
};

export const updateHomeWithEnergyCertificate = async (userId, homeId, homeData, energyCertificateData) => {
  const transaction = await sequelize.transaction();
  try {
    const { name, streetAddress, city, country, postalCode, timeZone, latitude, longitude } = homeData;

    const [updated] = await Home.update({ name, streetAddress, city, country, postalCode, timeZone, latitude, longitude }, { where: { id: homeId, userId }, transaction });

    if (!updated) {
      throw new Error("Home not found or user unauthorized");
    }

    await EnergyCertificate.update({ ...energyCertificateData }, { where: { homeId }, transaction });

    logger.info(`Home and energy certificate updated for user ${userId}: ${homeId}`);

    const updatedHome = await Home.findOne({ where: { id: homeId }, include: [ClimateControl, EnergyCertificate, Device, Event, EnergyUsage, TemperatureRecord, HVACSystemLog, AlertLog, Room, LightingControl, RoomTemperature, LightingReport], transaction });

    await transaction.commit();
    return updatedHome;
  } catch (error) {
    await transaction.rollback();
    logger.error(`Error updating home for user ${userId}: ${error.message}`);
    throw new Error("Could not update home");
  }
};

export const deleteHome = async (userId, homeId) => {
  try {
    const deleted = await Home.destroy({ where: { id: homeId, userId } });

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

export const getHomeDetails = async (userId, homeId) => {
  try {
    const home = await Home.findOne({
      where: { id: homeId, userId },
      include: [ClimateControl, EnergyCertificate, Device, EnergyUsage, TemperatureRecord, HVACSystemLog, AlertLog, Room, LightingControl, LightingReport]
    });
    if (!home) {
      throw new Error("Home not found or user unauthorized");
    }
    return home;
  } catch (error) {
    logger.error(`Error fetching home details for user ${userId}: ${error.message}`);
    throw new Error("Could not fetch home details");
  }
};

