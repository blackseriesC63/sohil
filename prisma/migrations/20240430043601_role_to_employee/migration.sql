/*
  Warnings:

  - You are about to drop the `employee` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "employee" DROP CONSTRAINT "employee_roleId_fkey";

-- DropForeignKey
ALTER TABLE "role" DROP CONSTRAINT "role_employeeId_fkey";

-- AlterTable
ALTER TABLE "role" ADD COLUMN     "role_name" TEXT;

-- DropTable
DROP TABLE "employee";

-- CreateTable
CREATE TABLE "Employee" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Employee_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "role" ADD CONSTRAINT "role_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee"("id") ON DELETE SET NULL ON UPDATE CASCADE;
