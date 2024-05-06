-- CreateTable
CREATE TABLE "Food_category" (
    "id" SERIAL NOT NULL,
    "menu_itemsId" INTEGER,

    CONSTRAINT "Food_category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Menu_items" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "image" TEXT NOT NULL,

    CONSTRAINT "Menu_items_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Food_category" ADD CONSTRAINT "Food_category_menu_itemsId_fkey" FOREIGN KEY ("menu_itemsId") REFERENCES "Menu_items"("id") ON DELETE SET NULL ON UPDATE CASCADE;
