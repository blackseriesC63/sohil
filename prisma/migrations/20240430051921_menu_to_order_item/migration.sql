-- CreateTable
CREATE TABLE "Order_items" (
    "id" SERIAL NOT NULL,
    "quantity" INTEGER NOT NULL,
    "menu_itemsId" INTEGER,

    CONSTRAINT "Order_items_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Order_items" ADD CONSTRAINT "Order_items_menu_itemsId_fkey" FOREIGN KEY ("menu_itemsId") REFERENCES "Menu_items"("id") ON DELETE SET NULL ON UPDATE CASCADE;
