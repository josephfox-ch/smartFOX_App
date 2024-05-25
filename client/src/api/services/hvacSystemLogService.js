import API from '../API';

export const createHVACSystemLog = async (data) => {
  try {
    const response = await API.post('/hvac-system-log', data);
    return response.data;
  } catch (error) {
    throw new Error(`Failed to create HVAC system log: ${error.message}`);
  }
};

export const getHVACSystemLogById = async (id) => {
  try {
    const response = await API.get(`/hvac-system-log/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(`Failed to retrieve HVAC system log: ${error.message}`);
  }
};

export const getHVACSystemLogByHomeId = async (homeId) => {
  try {
    const response = await API.get(`/hvac-system-log/home/${homeId}`);
    return response.data;
  } catch (error) {
    throw new Error(`Failed to retrieve HVAC system logs for the home: ${error.message}`);
  }
};
