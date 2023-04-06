/*
  Warnings:

  - You are about to drop the column `acquisitePeriod` on the `Vacation` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Employee" ADD COLUMN     "acquisitePeriod" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Vacation" DROP COLUMN "acquisitePeriod";
