import {EnergyUsage} from "../models/index.js";

export const createEnergyUsage = async (data) => {
  try {
    const usage = await EnergyUsage.create(data);
    return usage;
  } catch (error) {
    throw new Error("Failed to create energy usage log");
  }
};

export const getEnergyUsageById = async (id) => {
  try {
    const usage = await EnergyUsage.findByPk(id);
    if (!usage) {
      throw new Error(`Energy usage with ID: ${id} not found`);
    }
    return usage;
  } catch (error) {
    throw new Error("Failed to retrieve energy usage log");
  }
};

export const getEnergyUsageByHomeId = async (homeId) => {
  try {
    const usages = await EnergyUsage.findAll({ where: { homeId } });
    return usages;
  } catch (error) {
    throw new Error("Failed to retrieve energy usage logs for the home");
  }
};
