import { getPresignedPost, deleteAvatar } from "../services/s3Service.js";
import logger from "../../config/logger.js";

export const uploadAvatar = async (req, res) => {
  const { fileName, fileType } = req.body;

  try {
    await deleteAvatar(fileName); // Delete existing avatar
    logger.info(`Deleted previous avatar for user ${fileName}`);

    const data = await getPresignedPost(fileName, fileType);
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
    await deleteAvatar(fileName);
    logger.info(`Avatar deleted for user ${userId}`);
    res.status(200).json({ message: "Avatar deleted successfully" });
  } catch (error) {
    logger.error("Error deleting avatar", error);
    res.status(500).json({ error: "Error deleting avatar" });
  }
};
