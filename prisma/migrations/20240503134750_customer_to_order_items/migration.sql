/*
  Warnings:

  - You are about to drop the column `orderId` on the `Reciept` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Reciept" DROP CONSTRAINT "Reciept_orderId_fkey";

-- AlterTable
ALTER TABLE "Reciept" DROP COLUMN "orderId";
