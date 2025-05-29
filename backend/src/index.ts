import "dotenv/config";
import express from "express";
import cookieParser from "cookie-parser";
import { logger } from "./utils/logger";
import { connectDB } from "./utils/db";
import { config } from "./config/env.config";
import { errorHandler } from "./middlewares/errorHandler.middleware";

import authRoutes from "./routes/auth.route";

const app = express();
const PORT = config.PORT;
const BASE_PATH = config.BASE_PATH;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(`${BASE_PATH}/auth`, authRoutes);

app.use(errorHandler);

app.listen(PORT, () => {
  connectDB();
  logger.info(`Server listening on port ${PORT} in ${config.NODE_ENV}`);
});
