import { VerificationType } from "@prisma/client";
import { HttpStatusCode } from "../config/http.config";
import { prisma } from "../config/prisma.config";
import { loginUserSchemaType, registerUserSchemaType } from "../lib/schemas";
import { generateUniqueCode } from "../utils/generate-code";
import { HttpError } from "../utils/http-error";
import bcrypt from "bcrypt";
import { addDays, addHours } from "date-fns";
import { sendEmail } from "../utils/send-mail";
import { verificationCodeTemplate } from "../utils/templates";
import { logger } from "../utils/logger";
import { signJWT } from "../utils/jwt";

export const registerUserService = async (data: registerUserSchemaType) => {
  const existingUser = await prisma.user.findUnique({
    where: { email: data.email },
  });

  if (existingUser) {
    throw new HttpError(HttpStatusCode.BadRequest, "Email already in use");
  }

  const hashedPassword = await bcrypt.hash(data.password, 10);
  const code = await generateUniqueCode();

  const [user, emailVerification] = await prisma.$transaction(async (tx) => {
    const createdUser = await tx.user.create({
      data: {
        name: data.name,
        email: data.email,
        passwordHash: hashedPassword,
        settings: {
          create: {},
        },
      },
    });

    const verification = await tx.verification.create({
      data: {
        type: VerificationType.EMAIL_VERIFICATION,
        code,
        userId: createdUser.id,
        expiresAt: addHours(new Date(), 1),
      },
    });

    return [createdUser, verification];
  });
  logger.info(`User registered. email: ${user.email}`);

  try {
    await sendEmail({
      to: user.email,
      ...verificationCodeTemplate(emailVerification.code),
    });
  } catch (error) {
    logger.warn("Error sending verification email");
  }

  return;
};

export const loginUserService = async (data: loginUserSchemaType) => {
  const user = await prisma.user.findFirst({
    where: {
      email: data.email,
    },
  });
  if (!user) {
    throw new HttpError(HttpStatusCode.Unauthorized, "Invalid credentials");
  }

  const isMatching = await bcrypt.compare(data.password, user.passwordHash);
  if (!isMatching) {
    throw new HttpError(HttpStatusCode.Unauthorized, "Invalid credentials");
  }

  const session = await prisma.session.create({
    data: {
      userId: user.id,
      expiresAt: addDays(new Date(), 30),
    },
  });

  const accessToken = signJWT(
    { userId: user.id },
    {
      expiresIn: "15m",
      type: "access",
    }
  );

  const refreshToken = signJWT(
    { userId: user.id, sessionId: session.id },
    {
      expiresIn: "30d",
      type: "refresh",
    }
  );

  await prisma.session.update({
    where: { id: session.id },
    data: { refreshToken },
  });

  return {
    accessToken,
    refreshToken,
  };
};
