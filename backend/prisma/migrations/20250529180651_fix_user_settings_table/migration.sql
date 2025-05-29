/*
  Warnings:

  - The primary key for the `UserSettings` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_userSettingsId_fkey";

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "userSettingsId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "UserSettings" DROP CONSTRAINT "UserSettings_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "UserSettings_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "UserSettings_id_seq";

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_userSettingsId_fkey" FOREIGN KEY ("userSettingsId") REFERENCES "UserSettings"("id") ON DELETE SET NULL ON UPDATE CASCADE;
