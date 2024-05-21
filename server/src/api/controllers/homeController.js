import * as HomeService from "../services/homeService.js";
import logger from "../../config/logger.js";

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

export const createHomeWithEnergyCertificate = async (req, res) => {
  try {
    const userId = req.user.id;
    const homeData = req.body;
    const energyCertificateData = req.body.energyCertificate;

    const newHome = await HomeService.createHomeWithEnergyCertificate(
      userId,
      homeData,
      energyCertificateData
    );
    res.status(201).json(newHome);
  } catch (error) {
    logger.error(`POST /homes - ${error.message}`);
    res.status(500).json({ error: error.message });
  }
};

export const updateHomeWithEnergyCertificate = async (req, res) => {
  try {
    const userId = req.user.id;
    const homeId = req.params.id;
    const homeData = req.body;
    const energyCertificateData = req.body.energyCertificate;

    const updatedHome = await HomeService.updateHomeWithEnergyCertificate(
      userId,
      homeId,
      homeData,
      energyCertificateData
    );
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
    logger.error(`DELETE /home/${req.params.id} - ${error.message}`);
    res.status(500).json({ error: error.message });
  }
};

export const getHomeDetails = async (req, res) => {
  try {
    const userId = req.user.id;
    const homeId = req.params.id;
    const homeDetails = await HomeService.getHomeDetails(userId, homeId);
    res.status(200).json(homeDetails);
  } catch (error) {
    logger.error(`GET /homes/${req.params.id} - ${error.message}`);
    res.status(500).json({ error: error.message });
  }
};




