/*
  Warnings:

  - You are about to drop the `Payment_history` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_Payment_historyToReciept` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Payment_history" DROP CONSTRAINT "Payment_history_payment_typeId_fkey";

-- DropForeignKey
ALTER TABLE "_Payment_historyToReciept" DROP CONSTRAINT "_Payment_historyToReciept_A_fkey";

-- DropForeignKey
ALTER TABLE "_Payment_historyToReciept" DROP CONSTRAINT "_Payment_historyToReciept_B_fkey";

-- DropTable
DROP TABLE "Payment_history";

-- DropTable
DROP TABLE "_Payment_historyToReciept";

-- CreateTable
CREATE TABLE "Payment" (
    "id" SERIAL NOT NULL,
    "payment_typeId" INTEGER,

    CONSTRAINT "Payment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_PaymentToReciept" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_PaymentToReciept_AB_unique" ON "_PaymentToReciept"("A", "B");

-- CreateIndex
CREATE INDEX "_PaymentToReciept_B_index" ON "_PaymentToReciept"("B");

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_payment_typeId_fkey" FOREIGN KEY ("payment_typeId") REFERENCES "Payment_type"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PaymentToReciept" ADD CONSTRAINT "_PaymentToReciept_A_fkey" FOREIGN KEY ("A") REFERENCES "Payment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PaymentToReciept" ADD CONSTRAINT "_PaymentToReciept_B_fkey" FOREIGN KEY ("B") REFERENCES "Reciept"("id") ON DELETE CASCADE ON UPDATE CASCADE;
