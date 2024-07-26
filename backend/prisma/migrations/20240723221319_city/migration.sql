/*
  Warnings:

  - Added the required column `city` to the `Doppel` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Doppel" ADD COLUMN     "city" TEXT NOT NULL;
