-- AlterTable
ALTER TABLE "Reciept" ADD COLUMN     "order_itemsId" INTEGER;

-- AddForeignKey
ALTER TABLE "Reciept" ADD CONSTRAINT "Reciept_order_itemsId_fkey" FOREIGN KEY ("order_itemsId") REFERENCES "Order_items"("id") ON DELETE SET NULL ON UPDATE CASCADE;
