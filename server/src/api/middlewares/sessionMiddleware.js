import cookieSession from "cookie-session";

export const sessionMiddleware = cookieSession({
  name: "smartfoxhome-session",
  keys: [process.env.SESSION_SECRET_KEY],
  maxAge: 24 * 60 * 60 * 1000 * 30 * 6,
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax",
  signed: true,
});
