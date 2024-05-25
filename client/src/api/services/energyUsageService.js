import API from '../API';

export const createEnergyUsage = async (data) => {
  try {
    const response = await API.post('/energy-usage', data);
    return response.data;
  } catch (error) {
    throw new Error(`Failed to create energy usage log: ${error.message}`);
  }
};

export const getEnergyUsageById = async (id) => {
  try {
    const response = await API.get(`/energy-usage/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(`Failed to retrieve energy usage log: ${error.message}`);
  }
};

export const getEnergyUsageByHomeId = async (homeId) => {
  try {
    const response = await API.get(`/energy-usage/home/${homeId}`);
    return response.data;
  } catch (error) {
    throw new Error(`Failed to retrieve energy usage logs for the home: ${error.message}`);
  }
};
