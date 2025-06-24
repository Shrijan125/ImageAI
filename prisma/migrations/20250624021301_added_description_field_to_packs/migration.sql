/*
  Warnings:

  - You are about to alter the column `credits` on the `User` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.

*/
-- AlterTable
ALTER TABLE "Packs" ADD COLUMN     "description" TEXT;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "credits" SET DEFAULT 0,
ALTER COLUMN "credits" SET DATA TYPE INTEGER;
