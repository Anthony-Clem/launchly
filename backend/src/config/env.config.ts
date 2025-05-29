import { getEnv } from "../utils/get-env";

const envConfig = () => ({
  PORT: getEnv("PORT", "8000"),
  NODE_ENV: getEnv("NODE_ENV", "development"),
  BASE_PATH: getEnv("BASE_PATH", "/api/v1"),
  EMAIL_SENDER: getEnv("EMAIL_SENDER"),
  RESEND_API_KEY: getEnv("RESEND_API_KEY"),
  ACCESS_TOKEN_SECRET: getEnv("ACCESS_TOKEN_SECRET"),
  REFRESH_TOKEN_SECRET: getEnv("REFRESH_TOKEN_SECRET"),
});

export const config = envConfig();
