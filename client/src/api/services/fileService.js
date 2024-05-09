import API from '../API';

export const getPresignedUrl = async (fileName, fileType) => {
  try {
    const response = await API.post('/upload-avatar', { fileName, fileType });
    return response.data;
  } catch (error) {
    console.error('Error getting presigned URL', error);
    throw error;
  }
};