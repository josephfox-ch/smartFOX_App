import * as HomeService from '../services/homeService.js';
import logger from '../../config/logger.js';

export const getHomes = async (req, res) => {
  try {
    const userId = req.user.id;
    const homes = await HomeService.getHomes(userId);
    res.status(200).json(homes);
  } catch (error) {
    logger.error(`GET /homes - ${error.message}`);
    res.status(500).json({ error: error.message });
  }
};

export const createHome = async (req, res) => {
  try {
    const userId = req.user.id;
    const homeData = req.body;
    const newHome = await HomeService.createHome(userId, homeData);
    res.status(201).json(newHome);
  } catch (error) {
    logger.error(`POST /homes - ${error.message}`);
    res.status(500).json({ error: error.message });
  }
};

export const updateHome = async (req, res) => {
  try {
    const userId = req.user.id;
    const homeId = req.params.id;
    const homeData = req.body;
    const updatedHome = await HomeService.updateHome(userId, homeId, homeData);
    res.status(200).json(updatedHome);
  } catch (error) {
    logger.error(`PUT /homes/${req.params.id} - ${error.message}`);
    res.status(500).json({ error: error.message });
  }
};

export const deleteHome = async (req, res) => {
  try {
    const userId = req.user.id;
    const homeId = req.params.id;
    const deletedHome = await HomeService.deleteHome(userId, homeId);
    res.status(200).json(deletedHome);
  } catch (error) {
    logger.error(`DELETE /homes/${req.params.id} - ${error.message}`);
    res.status(500).json({ error: error.message });
  }
};
