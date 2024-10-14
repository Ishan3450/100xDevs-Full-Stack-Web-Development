/*
  Warnings:

  - You are about to drop the `Merchange` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Merchange";

-- CreateTable
CREATE TABLE "Merchant" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "auth_type" "AuthType" NOT NULL,

    CONSTRAINT "Merchant_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Merchant_email_key" ON "Merchant"("email");
