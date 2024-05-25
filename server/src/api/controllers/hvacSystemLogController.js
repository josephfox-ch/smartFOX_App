import * as HVACService from "../services/hvacSystemLogService.js";

export const createHVACSystemLog = async (req, res) => {
  try {
    const log = await HVACService.createHVACSystemLog(req.body);
    res.status(201).json(log);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getHVACSystemLogById = async (req, res) => {
  const { id } = req.params;
  try {
    const log = await HVACService.getHVACSystemLogById(id);
    res.status(200).json(log);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getHVACSystemLogByHomeId = async (req, res) => {
  const { homeId } = req.params;
  try {
    const logs = await HVACService.getHVACSystemLogByHomeId(homeId);
    res.status(200).json(logs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
