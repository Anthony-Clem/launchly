import { config } from "../config/env.config";
import { HttpStatusCode } from "../config/http.config";
import { loginUserSchema, registerUserSchema } from "../lib/schemas";
import { asyncHandler } from "../middlewares/asyncHandler.middleware";
import { loginUserService, registerUserService } from "../services/auth.service";

export const registerUserController = asyncHandler(async (req, res) => {
  const data = registerUserSchema.parse(req.body);

  await registerUserService(data);

  return res.status(HttpStatusCode.Created).json({
    success: true,
    message: "User registered successfully. Verification code sent.",
  });
});

export const loginUserController = asyncHandler(async (req, res) => {
  const ipAddress =
    req.headers["x-forwarded-for"]?.toString().split(",")[0] || req.socket.remoteAddress;
  const data = loginUserSchema.parse({
    ...req.body,
    userAgent: req.headers["user-agent"],
    ipAddress,
  });

  const { accessToken, refreshToken } = await loginUserService(data);

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    path: "/auth/refresh",
    secure: config.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 1000 * 60 * 60 * 24 * 30,
  });

  return res.status(HttpStatusCode.OK).json({
    token: accessToken,
    message: "User logged in successfully",
  });
});
