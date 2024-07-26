/*
  Warnings:

  - You are about to drop the column `occuptation` on the `Doppel` table. All the data in the column will be lost.
  - Added the required column `bio` to the `Doppel` table without a default value. This is not possible if the table is not empty.
  - Added the required column `occupation` to the `Doppel` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Doppel" DROP COLUMN "occuptation",
ADD COLUMN     "bio" TEXT NOT NULL,
ADD COLUMN     "occupation" TEXT NOT NULL;
