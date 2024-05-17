import API from '../API'; 

const ClimateService = {
  getClimateControlByHomeId: async (homeId) => {
    try {
      const response = await API.get(`/climate-control/home/${homeId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching climate control by home ID', error);
      throw error;
    }
  },

  createClimateControl: async (data) => {
    try {
      const response = await API.post('/climate-control', data);
      return response.data;
    } catch (error) {
      console.error('Error creating climate control', error);
      throw error;
    }
  },

  getClimateControlById: async (id) => {
    try {
      const response = await API.get(`/climate-control/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching climate control by ID', error);
      throw error;
    }
  },

  updateClimateControl: async (id, data) => {
    try {
      const response = await API.put(`/climate-control/${id}`, data);
      return response.data;
    } catch (error) {
      console.error('Error updating climate control', error);
      throw error;
    }
  },

  deleteClimateControl: async (id) => {
    try {
      const response = await API.delete(`/climate-control/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting climate control', error);
      throw error;
    }
  },
};

export default ClimateService;


