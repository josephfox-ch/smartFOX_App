import API from '../API';

const getDht22Data = async () => {
  try {
    const response = await API.get('/sensor/dht-22');
    return response.data; // Return the data directly
  } catch (error) {
    console.error('Error fetching DHT22 data:', error);
    throw error; // Throw error to handle it in the hook
  }
};

export { getDht22Data };

