import {Door} from '../models/index.js';
import logger from '../../config/logger.js';

export const getAllDoors = async (homeId) => {
  try {
    const doors = await Door.findAll({ where: { homeId } });
    return doors;
  } catch (error) {
    logger.error('Error fetching doors for home %s: %s', homeId, error.message);
    throw new Error('Error fetching doors');
  }
};

export const updateDoorStatus = async (doorId, status) => {
  try {
    const door = await Door.findByPk(doorId);
    if (!door) {
      const message = `Door with ID ${doorId} not found`;
      logger.error(message);
      throw new Error(message);
    }
    door.status = status;
    await door.save();
    logger.info('Door %s status updated to %s', doorId, status);
    return door;
  } catch (error) {
    logger.error('Error updating status for door %s: %s', doorId, error.message);
    throw new Error('Error updating door status');
  }
};

export const updateAllDoorsStatus = async (homeId, status) => {
  try {
    await Door.update({ status }, { where: { homeId } });
    const updatedDoors = await Door.findAll({ where: { homeId } });
    logger.info('All doors for home %s updated to status %s', homeId, status);
    return updatedDoors;
  } catch (error) {
    logger.error('Error updating all doors for home %s: %s', homeId, error.message);
    throw new Error('Error updating all doors');
  }
};
