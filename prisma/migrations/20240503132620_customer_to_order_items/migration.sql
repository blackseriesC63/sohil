/*
  Warnings:

  - You are about to drop the column `customerId` on the `Order_items` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Order_items" DROP CONSTRAINT "Order_items_customerId_fkey";

-- AlterTable
ALTER TABLE "Order_items" DROP COLUMN "customerId";
