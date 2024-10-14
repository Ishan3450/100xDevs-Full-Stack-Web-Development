/*
  Warnings:

  - A unique constraint covering the columns `[number]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `number` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "AuthType" AS ENUM ('Google', 'Github');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "number" TEXT NOT NULL,
ADD COLUMN     "password" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Merchange" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "auth_type" "AuthType" NOT NULL,

    CONSTRAINT "Merchange_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Merchange_email_key" ON "Merchange"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_number_key" ON "User"("number");
