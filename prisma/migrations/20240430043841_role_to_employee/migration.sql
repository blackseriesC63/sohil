/*
  Warnings:

  - You are about to drop the column `employeeId` on the `role` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "role" DROP CONSTRAINT "role_employeeId_fkey";

-- AlterTable
ALTER TABLE "Employee" ADD COLUMN     "roleId" INTEGER;

-- AlterTable
ALTER TABLE "role" DROP COLUMN "employeeId";

-- AddForeignKey
ALTER TABLE "Employee" ADD CONSTRAINT "Employee_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "role"("id") ON DELETE SET NULL ON UPDATE CASCADE;
