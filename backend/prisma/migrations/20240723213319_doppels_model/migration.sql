/*
  Warnings:

  - Added the required column `doppelId` to the `Conversation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Conversation" ADD COLUMN     "doppelId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Doppel" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "gender" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "race" TEXT NOT NULL,
    "nationality" TEXT NOT NULL,
    "occuptation" TEXT NOT NULL,
    "personality" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Doppel_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Doppel" ADD CONSTRAINT "Doppel_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Conversation" ADD CONSTRAINT "Conversation_doppelId_fkey" FOREIGN KEY ("doppelId") REFERENCES "Doppel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
