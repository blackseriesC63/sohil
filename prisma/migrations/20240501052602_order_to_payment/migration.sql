/*
  Warnings:

  - Changed the type of `isAvailable` on the `Table` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Table" DROP COLUMN "isAvailable",
ADD COLUMN     "isAvailable" BOOLEAN NOT NULL;
