import userRoutes from "./userRoutes.js";
import authRoutes from "./authRoutes.js";

export const useRoutes = (app) => {
  app.use("/api/v1/user", userRoutes);
  app.use("/api/v1/auth", authRoutes);
};
