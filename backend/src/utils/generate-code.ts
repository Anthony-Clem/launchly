import { prisma } from "../config/prisma.config";

export const generateUniqueCode = async (length = 6): Promise<string> => {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

  function generateCode(): string {
    let result = "";
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }

  while (true) {
    const code = generateCode();
    const existing = await prisma.verification.findFirst({
      where: { code },
    });

    if (!existing) {
      return code;
    }
  }
};
