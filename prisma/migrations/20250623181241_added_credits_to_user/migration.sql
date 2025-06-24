/*
  Warnings:

  - Added the required column `thumbnailUrl` to the `Packs` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Packs" ADD COLUMN     "thumbnailUrl" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "credits" DOUBLE PRECISION NOT NULL DEFAULT 0;
