import API from '../API';

const getDoors = (homeId) => {
  return API.get(`/door/${homeId}`);
};

const updateDoor = (doorId, status) => {
  return API.put(`/door/${doorId}`, { status });
};

const updateAllDoors = (homeId, status) => {
  return API.put(`/door/${homeId}/doors`, { status });
};

export { getDoors, updateDoor, updateAllDoors };
