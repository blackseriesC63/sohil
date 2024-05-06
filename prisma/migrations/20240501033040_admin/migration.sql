/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `Employee` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Employee" ALTER COLUMN "hashedRefreshToken" DROP NOT NULL,
ALTER COLUMN "password" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Employee_email_key" ON "Employee"("email");
