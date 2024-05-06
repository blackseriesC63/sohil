-- CreateTable
CREATE TABLE "Reciept" (
    "id" SERIAL NOT NULL,
    "total_price" INTEGER NOT NULL,
    "paymentId" INTEGER,
    "orderId" INTEGER,

    CONSTRAINT "Reciept_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Reciept" ADD CONSTRAINT "Reciept_paymentId_fkey" FOREIGN KEY ("paymentId") REFERENCES "Payment"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reciept" ADD CONSTRAINT "Reciept_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE SET NULL ON UPDATE CASCADE;
