import AccessControlService from '../services/accessControlService.js';
import logger from '../../config/logger.js';

const createAccessControl = async (req, res) => {
  const { userId, homeId, permissionLevel } = req.body;
  try {
    const accessControl = await AccessControlService.createAccessControl(userId, homeId, permissionLevel);
    res.status(201).json({
      success: true,
      accessControl,
    });
  } catch (error) {
    logger.error(`AccessControl could not created: ${error.message}`);
    res.status(400).json({
      success: false,
      message: 'AccessControl could not created',
      error: error.message,
    });
  }
};

const getAccessControlByUser = async (req, res) => {
  const { userId } = req.params;
  try {
    const accessControl = await AccessControlService.getAccessControlByUser(userId);
    res.status(200).json({
      success: true,
      accessControl,
    });
  } catch (error) {
    logger.error(`AccessControl could not fetched: ${error.message}`);
    res.status(400).json({
      success: false,
      message: 'AccessControl could not fetched',
      error: error.message,
    });
  }
}

const updateAccessControl = async (req, res) => {
  const { userId, homeId, permissionLevel } = req.body;
  try {
    const accessControl = await AccessControlService.updateAccessControl(userId, homeId, permissionLevel);
    res.status(200).json({
      success: true,
      accessControl,
    });
  } catch (error) {
    logger.error(`AccessControl could not updated: ${error.message}`);
    res.status(400).json({
      success: false,
      message: 'AccessControl could not updated',
      error: error.message,
    });
  }
};

export default { createAccessControl, getAccessControlByUser, updateAccessControl };
