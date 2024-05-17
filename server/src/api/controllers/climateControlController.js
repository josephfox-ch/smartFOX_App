import ClimateControlService from '../services/climateControlService.js';
import logger from '../../config/logger.js';

export const createClimateControl = async (req, res) => {
  try {
    const climateControl = await ClimateControlService.createClimateControl(req.body);
    res.status(201).json(climateControl);
  } catch (error) {
    logger.error('Error in create controller: %o', error);
    res.status(500).json({ error: error.message });
  }
};

export const getClimateControlById = async (req, res) => {
  try {
    const climateControl = await ClimateControlService.getClimateControlById(req.params.id);
    res.status(200).json(climateControl);
  } catch (error) {
    logger.error('Error in getById controller: %o', error);
    res.status(404).json({ error: error.message });
  }
};

export const getClimateControlByHomeId = async (req, res) => {
  try {
    const climateControl = await ClimateControlService.getClimateControlByHomeId(req.params.homeId);
    res.status(200).json(climateControl);
  } catch (error) {
    logger.error('Error in getByHomeId controller: %o', error);
    res.status(404).json({ error: error.message });
  }
};

export const updateClimateControl = async (req, res) => {
  try {
    const climateControl = await ClimateControlService.updateClimateControl(req.params.id, req.body);
    res.status(200).json(climateControl);
  } catch (error) {
    logger.error('Error in update controller: %o', error);
    res.status(500).json({ error: error.message });
  }
};

export const deleteClimateControl = async (req, res) => {
  try {
    await ClimateControlService.deleteClimateControl(req.params.id);
    res.status(204).send();
  } catch (error) {
    logger.error('Error in delete controller: %o', error);
    res.status(500).json({ error: error.message });
  }
};



