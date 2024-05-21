import API from "../API";
import logger from "../../config/logger";

export const getHomes = async () => {
  try {
    const response = await API.get("/home");
    logger.info("Fetched homes successfully");
    return response.data;
  } catch (error) {
    logger.error(`Error fetching homes: ${error.response?.data?.error || error.message}`);
    throw new Error(error.response?.data?.error || "Failed to fetch homes");
  }
};

export const createHomeWithEnergyCertificate = async (homeData, energyCertificateData) => {
  try {
    const response = await API.post("/home", {
      ...homeData,
      energyCertificate: energyCertificateData,
    });
    logger.info(`Home and its energy certificate created successfully with ID: ${response.data.id}`);
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.error || error.message;
    logger.error(`Error creating home: ${errorMessage}`);
    throw new Error(errorMessage || "Failed to create home");
  }
};

export const updateHomeWithEnergyCertificate = async (homeId, homeData, energyCertificateData) => {
  try {
    const response = await API.put(`/home/${homeId}`, {
      ...homeData,
      energyCertificate: energyCertificateData,
    });
    logger.info(`Home updated successfully with ID: ${homeId}`);
    return response.data;
  } catch (error) {
    logger.error(`Error updating home with ID ${homeId}: ${error.response?.data?.error || error.message}`);
    throw new Error(error.response?.data?.error || "Failed to update home");
  }
};

export const deleteHome = async (homeId) => {
  try {
    const response = await API.delete(`/home/${homeId}`);
    logger.info(`Home deleted successfully with ID: ${homeId}`);
    return response.data;
  } catch (error) {
    logger.error(`Error deleting home with ID ${homeId}: ${error.response?.data?.error || error.message}`);
    throw new Error(error.response?.data?.error || "Failed to delete home");
  }
};

export const getHomeDetails = async (homeId) => {
  try {
    const response = await API.get(`/home/${homeId}`);
    logger.info(`Fetched details for home with ID: ${homeId}`);
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.error || error.message;
    logger.error(`Error fetching home details: ${errorMessage}`);
    throw new Error(errorMessage || "Failed to fetch home details");
  }
};

