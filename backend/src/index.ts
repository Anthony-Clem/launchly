import "dotenv/config";
import express from "express";
import { logger } from "./utils/logger";
import { connectDB } from "./utils/db";
import { config } from "./config/env.config";

const app = express();
const PORT = config.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(PORT, () => {
  connectDB();
  logger.info(`Server listening on port ${PORT} in ${config.NODE_ENV}`);
});
