-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_order_itemsId_fkey";

-- AlterTable
ALTER TABLE "Order_items" ADD COLUMN     "orderId" INTEGER;

-- AddForeignKey
ALTER TABLE "Order_items" ADD CONSTRAINT "Order_items_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE SET NULL ON UPDATE CASCADE;
