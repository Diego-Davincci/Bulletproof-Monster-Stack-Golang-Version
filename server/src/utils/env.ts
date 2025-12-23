export const getEnv = () => ({
  PORT: process.env.PORT || 4000,

  DB_URL: process.env.DB_URL || "",
  DOMAIN: process.env.DOMAIN || "localhost",
  WEBSITE: process.env.WEBSITE || "http://localhost:5173",

  API_URL: process.env.API_URL || "http://localhost:5000",

  REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET || "",
  ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET || "",

  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID || "",
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET || "",
});
