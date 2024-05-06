-- CreateTable
CREATE TABLE "Shift" (
    "id" SERIAL NOT NULL,
    "start_time" TIMESTAMP(3) NOT NULL,
    "end_time" TIMESTAMP(3) NOT NULL,
    "employeeId" INTEGER,

    CONSTRAINT "Shift_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Shift" ADD CONSTRAINT "Shift_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee"("id") ON DELETE SET NULL ON UPDATE CASCADE;
