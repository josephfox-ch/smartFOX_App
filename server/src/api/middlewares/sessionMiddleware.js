import cookieSession from "cookie-session";

export const sessionMiddleware = cookieSession({
  name: process.env.SESSION_NAME || "session",
  keys: [process.env.SESSION_SECRET_KEY || "default_secret_key"],
  maxAge: 24 * 60 * 60 * 1000 * 30 * 6, // 6 months
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "none",
  signed: true,
});
