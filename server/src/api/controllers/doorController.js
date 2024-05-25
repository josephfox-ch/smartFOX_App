import * as doorService from '../services/doorService.js';
import logger from '../../config/logger.js';

export const getDoors = async (req, res) => {
  const { homeId } = req.params;
  try {
    const doors = await doorService.getAllDoors(homeId);
    res.json(doors);
    logger.info('Fetched doors for home %s', homeId);
  } catch (error) {
    logger.error('Error in getDoors controller for home %s: %s', homeId, error.message);
    res.status(500).json({ error: error.message });
  }
};

export const updateDoor = async (req, res) => {
  const { doorId } = req.params;
  const { status } = req.body;
  try {
    const door = await doorService.updateDoorStatus(doorId, status);
    res.json(door);
    logger.info('Door %s status updated to %s in controller', doorId, status);
  } catch (error) {
    logger.error('Error in updateDoor controller for door %s: %s', doorId, error.message);
    res.status(500).json({ error: error.message });
  }
};

export const updateAllDoors = async (req, res) => {
  const { homeId } = req.params;
  const { status } = req.body;
  try {
    const doors = await doorService.updateAllDoorsStatus(homeId, status);
    res.json(doors);
    logger.info('All doors for home %s updated to status %s in controller', homeId, status);
  } catch (error) {
    logger.error('Error in updateAllDoors controller for home %s: %s', homeId, error.message);
    res.status(500).json({ error: error.message });
  }
};
