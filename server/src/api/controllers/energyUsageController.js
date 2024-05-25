import * as EnergyService from "../services/energyUsageService.js";

export const createEnergyUsage = async (req, res) => {
  try {
    const usage = await EnergyService.createEnergyUsage(req.body);
    res.status(201).json(usage);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getEnergyUsageById = async (req, res) => {
  const { id } = req.params;
  try {
    const usage = await EnergyService.getEnergyUsageById(id);
    res.status(200).json(usage);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getEnergyUsageByHomeId = async (req, res) => {
  const { homeId } = req.params;
  try {
    const usages = await EnergyService.getEnergyUsageByHomeId(homeId);
    res.status(200).json(usages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
