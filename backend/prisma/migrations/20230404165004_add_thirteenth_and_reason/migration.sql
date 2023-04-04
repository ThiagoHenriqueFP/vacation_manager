/*
  Warnings:

  - You are about to drop the column `Reason` on the `Vacation` table. All the data in the column will be lost.
  - You are about to drop the column `Thirteenth` on the `Vacation` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Vacation" DROP COLUMN "Reason",
DROP COLUMN "Thirteenth",
ADD COLUMN     "reason" TEXT,
ADD COLUMN     "thirteenth" BOOLEAN NOT NULL DEFAULT false;
