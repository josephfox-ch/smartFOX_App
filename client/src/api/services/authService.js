import API from "../API";

const AuthService = {
  login: async ({ email, password }) => {
    try {
      const response = await API.post("/auth/login", {
        email,
        password,
      });
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Login failed due to server error"
      );
    }
  },

  logout: async () => {
    try {
      const response = await API.post("/auth/logout");
      return response.data;
    } catch (error) {
      console.error("Logout failed:", error);
      return { success: false, message: "Logout failed", error: error };
    }
  },

  register: async (userData) => {
    try {
      const response = await API.post("/auth/register", userData);
      return response.data;
    } catch (error) {
      throw new Error("Registration failed due to server error");
    }
  },

  verifyOTP: async (userId, otp) => {
    try {
      const response = await API.post("/auth/verify-otp", { userId, otp });
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message ||
          "An unexpected error occurred while verifying OTP"
      );
    }
  },

  sendOTP: async (email) => {
    try {
      const response = await API.post("/auth/send-otp", { email });
      return response.data;
    } catch (error) {
      throw new Error("Unable to send OTP");
    }
  },

  resendOTP: async (userId) => {
    try {
      const response = await API.post("/auth/resend-otp", { userId });
      return response.data;
    } catch (error) {
      throw new Error("Unable to resend OTP");
    }
  },

  forgotPassword: async (email) => {
    try {
      const response = await API.post("/auth/forgot-password", { email });
      return response.data;
    } catch (error) {
      throw new Error("Unable to send reset link");
    }
  },

  resetPassword: async (token, password) => {
    try {
      const response = await API.post("/auth/reset-password", {
        token,
        password,
      });
      return response.data;
    } catch (error) {
      throw new Error("Unable to reset password");
    }
  },

  validateSession: async () => {
    try {
      const response = await API.post("/auth/validate-session");
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message ||
          "For your security, Your session has expired. Please log in again."
      );
    }
  },

  getUser: async () => {
    try {
      const response = await API.get("/user");
      console.log("api-user-get", response.data);
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message ||
          "For your security, Your session has expired. Please log in again."
      );
    }
  },
};

export default AuthService;
