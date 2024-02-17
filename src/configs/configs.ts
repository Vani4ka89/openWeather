import { config } from "dotenv";

config();

export const configs = {
  PORT: process.env.PORT,
  WEATHER_API_KEY: process.env.WEATHER_API_KEY,
  WEATHER_URL: process.env.WEATHER_URL,
};
