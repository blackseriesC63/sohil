/*
  Warnings:

  - You are about to drop the column `paymentId` on the `Reciept` table. All the data in the column will be lost.
  - You are about to drop the `Payment` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Payment" DROP CONSTRAINT "Payment_orderId_fkey";

-- DropForeignKey
ALTER TABLE "Payment" DROP CONSTRAINT "Payment_payment_typeId_fkey";

-- DropForeignKey
ALTER TABLE "Reciept" DROP CONSTRAINT "Reciept_paymentId_fkey";

-- AlterTable
ALTER TABLE "Reciept" DROP COLUMN "paymentId";

-- DropTable
DROP TABLE "Payment";

-- CreateTable
CREATE TABLE "Payment_history" (
    "id" SERIAL NOT NULL,
    "payment_typeId" INTEGER,

    CONSTRAINT "Payment_history_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_Payment_historyToReciept" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_Payment_historyToReciept_AB_unique" ON "_Payment_historyToReciept"("A", "B");

-- CreateIndex
CREATE INDEX "_Payment_historyToReciept_B_index" ON "_Payment_historyToReciept"("B");

-- AddForeignKey
ALTER TABLE "Payment_history" ADD CONSTRAINT "Payment_history_payment_typeId_fkey" FOREIGN KEY ("payment_typeId") REFERENCES "Payment_type"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Payment_historyToReciept" ADD CONSTRAINT "_Payment_historyToReciept_A_fkey" FOREIGN KEY ("A") REFERENCES "Payment_history"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Payment_historyToReciept" ADD CONSTRAINT "_Payment_historyToReciept_B_fkey" FOREIGN KEY ("B") REFERENCES "Reciept"("id") ON DELETE CASCADE ON UPDATE CASCADE;
