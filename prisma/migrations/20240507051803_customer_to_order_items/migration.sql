/*
  Warnings:

  - You are about to drop the column `hashed_password` on the `Admin` table. All the data in the column will be lost.
  - You are about to drop the column `login` on the `Admin` table. All the data in the column will be lost.
  - Added the required column `name` to the `Admin` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone` to the `Admin` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Admin" DROP COLUMN "hashed_password",
DROP COLUMN "login",
ADD COLUMN     "hashed_refresh_password" TEXT,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "phone" TEXT NOT NULL;
