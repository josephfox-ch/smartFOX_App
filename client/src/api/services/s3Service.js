import API from '../API';

const getPresignedUrl = async (fileName, fileType) => {
  try {
    const response = await API.post('/aws/upload-avatar', { fileName, fileType });
    return response.data;
  } catch (error) {
    console.error('Error getting presigned URL', error);
    throw error;
  }
};

const deleteAvatarFromS3 = async (userId) => {
  try {
    const response = await API.delete('/aws/delete-avatar', { data: { userId } });
    return response.data;
  } catch (error) {
    console.error('Error deleting avatar', error);
    throw error;
  }
};

const getWaterFlowTemperature = async (homeId) => {
  try {
    const response = await API.get(`/aws/iot/home-thermostat/tw/${homeId}`);
    return response.data.temperature;
  } catch (error) {
    console.error(`Failed to fetch water flow temperature for home with ID: ${homeId}`, error);
    throw error;
  }
};

export {getPresignedUrl, deleteAvatarFromS3, getWaterFlowTemperature}