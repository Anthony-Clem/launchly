import jwt, { SignOptions } from "jsonwebtoken";
import { config } from "../config/env.config";

export type AccessTokenPayload = {
  userId: string;
};

export type RefreshTokenPayload = {
  userId: string;
  sessionId: string;
};

export const signJWT = (
  payload: AccessTokenPayload | RefreshTokenPayload,
  options: {
    expiresIn: string;
    type: "access" | "refresh";
  }
) => {
  const secret =
    options.type === "access" ? config.ACCESS_TOKEN_SECRET : config.REFRESH_TOKEN_SECRET;

  return jwt.sign(payload, secret, {
    algorithm: "HS256",
    expiresIn: options.expiresIn,
  } as SignOptions);
};
