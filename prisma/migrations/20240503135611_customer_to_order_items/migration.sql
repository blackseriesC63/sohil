/*
  Warnings:

  - You are about to drop the column `order_itemsId` on the `Reciept` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Reciept" DROP CONSTRAINT "Reciept_order_itemsId_fkey";

-- AlterTable
ALTER TABLE "Reciept" DROP COLUMN "order_itemsId",
ADD COLUMN     "orderId" INTEGER;

-- AddForeignKey
ALTER TABLE "Reciept" ADD CONSTRAINT "Reciept_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE SET NULL ON UPDATE CASCADE;
