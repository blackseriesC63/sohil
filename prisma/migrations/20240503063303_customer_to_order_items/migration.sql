/*
  Warnings:

  - You are about to drop the column `customerId` on the `Order` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_customerId_fkey";

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "customerId";

-- AlterTable
ALTER TABLE "Order_items" ADD COLUMN     "customerId" INTEGER;

-- AddForeignKey
ALTER TABLE "Order_items" ADD CONSTRAINT "Order_items_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE SET NULL ON UPDATE CASCADE;
