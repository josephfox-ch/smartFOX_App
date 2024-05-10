import API from '../API';

const getPresignedUrl = async (fileName, fileType) => {
  try {
    const response = await API.post('/upload-avatar', { fileName, fileType });
    return response.data;
  } catch (error) {
    console.error('Error getting presigned URL', error);
    throw error;
  }
};

const deleteAvatarFromS3 = async (userId) => {
  try {
    const response = await API.delete('/delete-avatar', { data: { userId } });
    return response.data;
  } catch (error) {
    console.error('Error deleting avatar', error);
    throw error;
  }
};

export {getPresignedUrl, deleteAvatarFromS3}