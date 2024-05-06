/*
  Warnings:

  - You are about to drop the column `menu_itemsId` on the `Food_category` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Food_category" DROP CONSTRAINT "Food_category_menu_itemsId_fkey";

-- AlterTable
ALTER TABLE "Food_category" DROP COLUMN "menu_itemsId";

-- AlterTable
ALTER TABLE "Menu_items" ADD COLUMN     "food_categoryId" INTEGER;

-- AddForeignKey
ALTER TABLE "Menu_items" ADD CONSTRAINT "Menu_items_food_categoryId_fkey" FOREIGN KEY ("food_categoryId") REFERENCES "Food_category"("id") ON DELETE SET NULL ON UPDATE CASCADE;
