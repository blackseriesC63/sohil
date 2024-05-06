-- CreateTable
CREATE TABLE "Payment_type" (
    "id" SERIAL NOT NULL,
    "payment_type" TEXT NOT NULL,

    CONSTRAINT "Payment_type_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Payment" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "amount" INTEGER NOT NULL,
    "status" TEXT NOT NULL,
    "payment_typeId" INTEGER,

    CONSTRAINT "Payment_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_payment_typeId_fkey" FOREIGN KEY ("payment_typeId") REFERENCES "Payment_type"("id") ON DELETE SET NULL ON UPDATE CASCADE;
