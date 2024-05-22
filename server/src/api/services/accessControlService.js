import { AccessControl } from '../models/index.js';

const createAccessControl = async (userId, homeId, permissionLevel) => {
  try {
    const accessControl = await AccessControl.create({
      userId,
      homeId,
      permissionLevel,
    });
    return accessControl;
  } catch (error) {
    throw new Error(`AccessControl could not created: ${error.message}`);
  }
};

const getAccessControlByUser = async (userId) => {
  try {
    const accessControl = await AccessControl.findAll({ where: { userId } });
    return accessControl;
  } catch (error) {
    throw new Error(`AccessControl could not fetched: ${error.message}`);
  }
};

const updateAccessControl = async (userId, homeId, newPermissionLevel) => {
  try {
    const accessControl = await AccessControl.findOne({ where: { userId, homeId } });
    if (accessControl) {
      accessControl.permissionLevel = newPermissionLevel;
      await accessControl.save();
    }
    return accessControl;
  } catch (error) {
    throw new Error(`AccessControl could not updated: ${error.message}`);
  }
};

export default { createAccessControl,getAccessControlByUser, updateAccessControl };
