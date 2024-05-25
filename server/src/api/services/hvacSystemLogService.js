import {HVACSystemLog} from "../models/index.js";

export const createHVACSystemLog = async (data) => {
  try {
    const log = await HVACSystemLog.create(data);
    return log;
  } catch (error) {
    throw new Error("Failed to create HVAC system log");
  }
};

export const getHVACSystemLogById = async (id) => {
  try {
    const log = await HVACSystemLog.findByPk(id);
    if (!log) {
      throw new Error(`Log with ID: ${id} not found`);
    }
    return log;
  } catch (error) {
    throw new Error("Failed to retrieve HVAC system log");
  }
};

export const getHVACSystemLogByHomeId = async (homeId) => {
  try {
    const logs = await HVACSystemLog.findAll({ where: { homeId } });
    return logs;
  } catch (error) {
    throw new Error("Failed to retrieve HVAC system logs for the home");
  }
};
