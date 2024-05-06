/*
  Warnings:

  - You are about to drop the column `total_price` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the `Shift` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `hashed_password` to the `Customer` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Shift" DROP CONSTRAINT "Shift_employeeId_fkey";

-- AlterTable
ALTER TABLE "Customer" ADD COLUMN     "activation_link" TEXT,
ADD COLUMN     "hashed_password" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "total_price";

-- DropTable
DROP TABLE "Shift";
