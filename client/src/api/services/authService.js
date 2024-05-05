import API from "../index";

const AuthService = {
  login: async ({ email, password }) => {
    try {
      const response = await API.post("/auth/login", {
        email,
        password,
      });
      console.log("Login response:", response.data);
      return response.data;
    } catch (error) {
      console.error("Login error:", error.response || error);
      return {
        error: true,
        message:
          error.response?.data?.error || "Login failed due to server error",
      };
    }
  },

  logout: async () => {
    try {
      const response = await API.post("/auth/logout");
      console.log("Logout response:", response.data);

      return { success: true, message: "Logout successful" };
    } catch (error) {
      console.error("Logout failed:", error);
      return { success: false, message: "Logout failed", error: error };
    }
  },

  register: async (userData) => {
    try {
      const response = await API.post("/auth/register", userData);
      console.log("Register response:", response.data);
      return response.data;
    } catch (error) {
      console.error("Register error:", error);
      throw new Error("Registration failed. Please try again.");
    }
  },
  verifyOTP: async (userId, otp) => {
    try {
      const response = await API.post("/auth/verify-otp", {
        userId,
        otp,
      });
      return response.data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "An unexpected error occurred.";
      throw new Error(errorMessage);
    }
  },
  resendOTP: async (userId) => {
    const response = await API.post("/auth/resend-otp", { userId });
    return response.data;
  },
  sendOTP: async (email) => {
    try {
      const response = await API.post("/auth/send-otp", { email });
      return response.data;
    } catch (error) {
      throw error.response?.data?.error || "Unable to send OTP.";
    }
  },
  forgotPassword: async (email) => {
    try {
      const response = await API.post("/auth/forgot-password", { email });
      console.log("forgot", response);
      return response.data;
    } catch (error) {
      throw error || "Unable to send reset link.";
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
      throw error.response.data.error || "Unable to reset password.";
    }
  },
};

export default AuthService;
