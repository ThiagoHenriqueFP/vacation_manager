/*
  Warnings:

  - You are about to drop the column `acquisitePeriod` on the `Employee` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Employee" DROP COLUMN "acquisitePeriod",
ADD COLUMN     "acquisitivePeriod" BOOLEAN NOT NULL DEFAULT false;
