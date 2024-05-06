/*
  Warnings:

  - You are about to drop the column `password` on the `Admin` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Admin" DROP COLUMN "password",
ALTER COLUMN "hashed_refresh_password" DROP NOT NULL,
ALTER COLUMN "hashed_refresh_token" DROP NOT NULL;
