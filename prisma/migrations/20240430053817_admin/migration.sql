-- CreateTable
CREATE TABLE "Admin" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "is_active" BOOLEAN NOT NULL,
    "is_creator" BOOLEAN NOT NULL,
    "hashed_refresh_password" TEXT NOT NULL,
    "hashed_refresh_token" TEXT NOT NULL,

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("id")
);
