-- AlterTable
ALTER TABLE "Reciept" ADD COLUMN     "payment_typeId" INTEGER;

-- AddForeignKey
ALTER TABLE "Reciept" ADD CONSTRAINT "Reciept_payment_typeId_fkey" FOREIGN KEY ("payment_typeId") REFERENCES "Payment_type"("id") ON DELETE SET NULL ON UPDATE CASCADE;
