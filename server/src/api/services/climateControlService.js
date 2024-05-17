import ClimateControl from '../models/ClimateControl.js';
import logger from '../../config/logger.js';

const createClimateControl = async (data) => {
  try {
    const climateControl = await ClimateControl.create(data);
    return climateControl;
  } catch (error) {
    logger.error('Error creating ClimateControl: %o', error);
    throw new Error('Could not create ClimateControl');
  }
};

const getClimateControlById = async (id) => {
  try {
    const climateControl = await ClimateControl.findByPk(id);
    if (!climateControl) {
      throw new Error('ClimateControl not found');
    }
    return climateControl;
  } catch (error) {
    logger.error('Error fetching ClimateControl by ID: %o', error);
    throw new Error('Could not fetch ClimateControl');
  }
};

const getClimateControlByHomeId = async (homeId) => {
  try {
    const climateControl = await ClimateControl.findOne({ where: { homeId } });
    if (!climateControl) {
      throw new Error('ClimateControl not found');
    }
    return climateControl;
  } catch (error) {
    logger.error('Error fetching ClimateControl by home ID: %o', error);
    throw new Error('Could not fetch ClimateControl');
  }
};

const updateClimateControl = async (id, data) => {
  try {
    const climateControl = await ClimateControl.findByPk(id);
    if (!climateControl) {
      throw new Error('ClimateControl not found');
    }
    await climateControl.update(data);
    return climateControl;
  } catch (error) {
    logger.error('Error updating ClimateControl: %o', error);
    throw new Error('Could not update ClimateControl');
  }
};

const deleteClimateControl = async (id) => {
  try {
    const climateControl = await ClimateControl.findByPk(id);
    if (!climateControl) {
      throw new Error('ClimateControl not found');
    }
    await climateControl.destroy();
    return climateControl;
  } catch (error) {
    logger.error('Error deleting ClimateControl: %o', error);
    throw new Error('Could not delete ClimateControl');
  }
};

export default {
  createClimateControl,
  getClimateControlById,
  getClimateControlByHomeId,
  updateClimateControl,
  deleteClimateControl,
};


