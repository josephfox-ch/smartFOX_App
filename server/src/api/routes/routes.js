import authRoutes from "./authRoutes.js";
import userRoutes from "./userRoutes.js";
import homeRoutes from "./homeRoutes.js";
import awsRoutes from "./awsRoutes.js";
import climateControlRoutes from './climateControlRoutes.js'

export const useRoutes = (app) => {
  app.use("/api/v1/auth", authRoutes);
  app.use("/api/v1/user", userRoutes);
  app.use("/api/v1/home", homeRoutes);
  app.use("/api/v1/aws", awsRoutes);
  app.use("/api/v1/climate-control", climateControlRoutes);
};
