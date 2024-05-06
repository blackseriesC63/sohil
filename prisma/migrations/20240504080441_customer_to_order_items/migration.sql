/*
  Warnings:

  - You are about to drop the `_PaymentToReciept` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_PaymentToReciept" DROP CONSTRAINT "_PaymentToReciept_A_fkey";

-- DropForeignKey
ALTER TABLE "_PaymentToReciept" DROP CONSTRAINT "_PaymentToReciept_B_fkey";

-- AlterTable
ALTER TABLE "Payment" ADD COLUMN     "recieptId" INTEGER;

-- DropTable
DROP TABLE "_PaymentToReciept";

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_recieptId_fkey" FOREIGN KEY ("recieptId") REFERENCES "Reciept"("id") ON DELETE SET NULL ON UPDATE CASCADE;
