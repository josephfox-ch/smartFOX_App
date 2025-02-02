import express from "express";
import logger from "../../config/logger.js";

const router = express.Router();

// Save Logs recevied from Frontend
router.post("/", (req, res) => {
  const { level, message } = req.body;

  if (!level || !message) {
    return res.status(400).json({ error: "Provide Log level and message" });
  }

  logger.log({ level, message });
  res.status(200).json({ success: true });
});

export default router;