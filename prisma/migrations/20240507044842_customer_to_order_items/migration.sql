/*
  Warnings:

  - You are about to drop the column `hashed_refresh_password` on the `Admin` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Admin" DROP COLUMN "hashed_refresh_password",
ADD COLUMN     "hashed_password" TEXT;
