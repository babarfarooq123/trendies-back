-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT,
    "name" TEXT,
    "surname" TEXT,
    "nickname" TEXT,
    "dateOfBirth" TEXT,
    "password" TEXT,
    "refCode" INTEGER,
    "status" INTEGER,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);
