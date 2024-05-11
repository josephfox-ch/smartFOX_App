import API from "../API";
import logger from "../config/logger";


export const getHomes = async () => {
  try {
    const response = await API.get("/homes");
    logger.info("Fetched homes successfully");
    return response.data;
  } catch (error) {
    logger.error(`Error fetching homes: ${error.response?.data?.error || error.message}`);
    throw new Error(error.response?.data?.error || "Failed to fetch homes");
  }
};


export const createHome = async (homeData) => {
  try {
    const response = await API.post("/homes", homeData);
    logger.info(`Home created successfully with ID: ${response.data.id}`);
    return response.data;
  } catch (error) {
    logger.error(`Error creating home: ${error.response?.data?.error || error.message}`);
    throw new Error(error.response?.data?.error || "Failed to create home");
  }
};


export const updateHome = async (homeId, homeData) => {
  try {
    const response = await API.put(`/homes/${homeId}`, homeData);
    logger.info(`Home updated successfully with ID: ${homeId}`);
    return response.data;
  } catch (error) {
    logger.error(`Error updating home with ID ${homeId}: ${error.response?.data?.error || error.message}`);
    throw new Error(error.response?.data?.error || "Failed to update home");
  }
};


export const deleteHome = async (homeId) => {
  try {
    const response = await API.delete(`/homes/${homeId}`);
    logger.info(`Home deleted successfully with ID: ${homeId}`);
    return response.data;
  } catch (error) {
    logger.error(`Error deleting home with ID ${homeId}: ${error.response?.data?.error || error.message}`);
    throw new Error(error.response?.data?.error || "Failed to delete home");
  }
};

