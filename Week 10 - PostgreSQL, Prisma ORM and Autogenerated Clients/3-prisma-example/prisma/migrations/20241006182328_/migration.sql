/*
  Warnings:

  - You are about to drop the column `blob` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `isAdmin` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `largeNum` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "blob",
DROP COLUMN "isAdmin",
DROP COLUMN "largeNum";
