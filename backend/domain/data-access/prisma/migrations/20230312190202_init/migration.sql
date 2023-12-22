/*
  Warnings:

  - You are about to alter the column `telNr` on the `User` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.

*/
-- AlterTable
ALTER TABLE "User" ALTER COLUMN "telNr" SET DATA TYPE INTEGER;
