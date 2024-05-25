import * as  s3Service from "../services/s3Service.js";
import {Home} from '../models/index.js'
import logger from "../../config/logger.js";

export const uploadAvatar = async (req, res) => {
  const { fileName, fileType } = req.body;

  try {
    await s3Service.deleteAvatar(fileName);
    logger.info(`Deleted previous avatar for user ${fileName}`);

    const data = await s3Service.getPresignedPost(fileName, fileType);
    logger.info("Presigned URL generated successfully");

    res.json(data);
  } catch (error) {
    logger.error("Error generating presigned URL", error);
    res.status(500).json({ error: "Error generating presigned URL" });
  }
};

export const removeAvatar = async (req, res) => {
  const { userId } = req.body;
  const fileName = `avatars/${userId}.png`;

  try {
    await s3Service.deleteAvatar(fileName);
    logger.info(`Avatar deleted for user ${userId}`);
    res.status(200).json({ message: "Avatar deleted successfully" });
  } catch (error) {
    logger.error("Error deleting avatar", error);
    res.status(500).json({ error: "Error deleting avatar" });
  }
};

export const getWaterFlowTemperature = async (req, res) => {
  const { homeId } = req.params;
  try {
    const home = await Home.findByPk(homeId);
    if (!home) {
      logger.error(`Home with ID: ${homeId} not found`);
      res.status(404).json({ error: `Home with ID: ${homeId} not found` });
      return;
    }
    const waterFlowTemperature = await s3Service.getWaterFlowTemperature(homeId);
    res.status(200).json({ temperature: waterFlowTemperature });
  } catch (error) {
    logger.error(`Failed to fetch water flow temperature for home with ID: ${homeId}`, error);
    res.status(500).json({ error: error.message });
  }
};
