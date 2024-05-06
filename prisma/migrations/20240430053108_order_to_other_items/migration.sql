/*
  Warnings:

  - You are about to drop the column `manager_id` on the `Restaurant` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Restaurant" DROP COLUMN "manager_id",
ADD COLUMN     "employeeId" INTEGER;

-- CreateTable
CREATE TABLE "Table" (
    "id" SERIAL NOT NULL,
    "table_number" INTEGER NOT NULL,
    "capacity" INTEGER NOT NULL,
    "status" TEXT NOT NULL,

    CONSTRAINT "Table_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Customer" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,

    CONSTRAINT "Customer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Order" (
    "id" SERIAL NOT NULL,
    "total_price" INTEGER NOT NULL,
    "status" TEXT NOT NULL,
    "order_date" TIMESTAMP(3) NOT NULL,
    "comments" TEXT NOT NULL,
    "order_itemsId" INTEGER,
    "tableId" INTEGER,
    "customerId" INTEGER,
    "employeeId" INTEGER,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Restaurant" ADD CONSTRAINT "Restaurant_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_order_itemsId_fkey" FOREIGN KEY ("order_itemsId") REFERENCES "Order_items"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_tableId_fkey" FOREIGN KEY ("tableId") REFERENCES "Table"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee"("id") ON DELETE SET NULL ON UPDATE CASCADE;
