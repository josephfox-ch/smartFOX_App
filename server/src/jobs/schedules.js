import cron from "node-cron";
import { cleanExpiredTokens } from "../utils/jwtHelpers";
import { cleanExpiredOtps } from "../utils/utils.js";

cron.schedule("0 0 * * *", async () => {
  try {
    console.log("Starting the cleanup process for expired refresh tokens.");
    await cleanExpiredTokens();
    console.log("Cleanup process completed successfully.");
  } catch (error) {
    console.error("Error during the cleanup of expired tokens:", error);
  }
});

cron.schedule(
  "0 3,21 * * *",
  async () => {
    await cleanExpiredOtps();
  },
  {
    timezone: "Europe/Zurich",
  }
);

