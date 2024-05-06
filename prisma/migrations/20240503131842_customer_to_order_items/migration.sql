/*
  Warnings:

  - You are about to drop the column `comments` on the `Order` table. All the data in the column will be lost.
  - Added the required column `comments` to the `Order_items` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Order" DROP COLUMN "comments";

-- AlterTable
ALTER TABLE "Order_items" ADD COLUMN     "comments" TEXT NOT NULL;
