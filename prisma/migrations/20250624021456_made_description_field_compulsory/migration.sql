/*
  Warnings:

  - Made the column `description` on table `Packs` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Packs" ALTER COLUMN "description" SET NOT NULL;
