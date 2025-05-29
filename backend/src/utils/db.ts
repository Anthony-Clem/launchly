import { prisma } from "../config/prisma.config";
import { logger } from "./logger";

export const connectDB = async () => {
  try {
    await prisma.$connect();
    logger.info("Database connected successfully");
  } catch (error) {
    logger.error("Failed to connect to the database");
    logger.error(error);
    process.exit(1);
  }
};
