import API from '../API';

const getDoors = async (homeId) => {
  try {
    const response = await API.get(`/door/${homeId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching doors for home ${homeId}:`, error);
    throw error;
  }
};

const updateDoor = async (doorId, status) => {
  try {
    const response = await API.put(`/door/${doorId}`, { status });
    return response.data;
  } catch (error) {
    console.error(`Error updating door ${doorId} status:`, error);
    throw error;
  }
};

const updateAllDoors = async (homeId, status) => {
  try {
    const response = await API.put(`/door/${homeId}/doors`, { status });
    return response.data;
  } catch (error) {
    console.error(`Error updating all doors for home ${homeId}:`, error);
    throw error;
  }
};

export { getDoors, updateDoor, updateAllDoors };

