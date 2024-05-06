/*
  Warnings:

  - You are about to drop the column `order_itemsId` on the `Reciept` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Reciept" DROP CONSTRAINT "Reciept_order_itemsId_fkey";

-- AlterTable
ALTER TABLE "Reciept" DROP COLUMN "order_itemsId";
