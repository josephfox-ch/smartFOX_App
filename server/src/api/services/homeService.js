import { Home, ClimateControl, EnergyCertificate, EnergyUsage, TemperatureRecord, HVACSystemLog,LightingControl, LightingReport,AccessControl,Door } from "../models/index.js";
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

  

    const defaultModels = [
      { model: Door, data: { homeId: newHome.id, userId: newHome.userId ,name:newHome.name} },
      { model: ClimateControl, data: {homeId: newHome.id}},
      { model: AccessControl, data: {homeId: newHome.id, userId: newHome.userId ,permissionLevel: 'parents'}},
      { model: TemperatureRecord, data: { homeId: newHome.id } },
      { model: HVACSystemLog, data: { homeId: newHome.id, status: 'off', startedAt: new Date() } },
      { model: LightingControl, data: { homeId: newHome.id } },
      { model: LightingReport, data: { homeId: newHome.id } },
      { model: EnergyUsage, data: { homeId: newHome.id, energyConsumed: 0, date: new Date() } },
    ];

    for (const item of defaultModels) {
      await item.model.create(item.data, { transaction });
      logger.info(`${item.model.name} created for home ${newHome.id}`);
    }

    await transaction.commit();
    return {
      ...newHome.toJSON(),
      energyCertificate: newEnergyCertificate,
    };
  } catch (error) {
    await transaction.rollback();
    logger.error(
      `Error creating home, energy certificate, and related models for user ${userId}: ${error.message}`
    );
    throw new Error('Could not create home, energy certificate, and related models');
  }
};

export const updateHomeWithEnergyCertificate = async (userId, homeId, homeData, energyCertificateData) => {
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

    const [updatedHomeCount] = await Home.update(
      {
        name,
        streetAddress,
        city,
        country,
        postalCode,
        timeZone,
        latitude,
        longitude,
      },
      { where: { id: homeId, userId }, transaction }
    );

    if (!updatedHomeCount) {
      throw new Error("Home not found or user unauthorized");
    }

    const [updatedEnergyCertificateCount] = await EnergyCertificate.update(
      {
        ...energyCertificateData,
      },
      { where: { homeId }, transaction }
    );

    if (!updatedEnergyCertificateCount) {
      throw new Error("Energy Certificate not found or user unauthorized");
    }

    await transaction.commit();
    const updatedHome = await Home.findOne({
      where: { id: homeId, userId },
      include: [ClimateControl, EnergyCertificate, EnergyUsage, TemperatureRecord, HVACSystemLog, LightingControl, LightingReport,Door],
    });

    logger.info(`Home and Energy Certificate updated for user ${userId}: ${homeId}`);
    return updatedHome;
  } catch (error) {
    await transaction.rollback();
    logger.error(`Error updating home and energy certificate for user ${userId}: ${error.message}`);
    throw new Error("Could not update home and energy certificate");
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
      include: [ClimateControl, EnergyCertificate, EnergyUsage, TemperatureRecord, HVACSystemLog, LightingControl, LightingReport,Door]
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

