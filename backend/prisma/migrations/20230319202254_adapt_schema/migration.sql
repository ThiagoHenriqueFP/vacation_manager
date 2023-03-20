/*
  Warnings:

  - You are about to drop the `Manager` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `employee_id` on the `Team` table. All the data in the column will be lost.
  - Added the required column `manager_id` to the `Employee` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Manager_registration_key";

-- DropIndex
DROP INDEX "Manager_email_key";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Manager";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Team" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "manager_id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "sub_team" TEXT,
    CONSTRAINT "Team_manager_id_fkey" FOREIGN KEY ("manager_id") REFERENCES "Employee" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Team" ("id", "manager_id", "name", "sub_team") SELECT "id", "manager_id", "name", "sub_team" FROM "Team";
DROP TABLE "Team";
ALTER TABLE "new_Team" RENAME TO "Team";
CREATE UNIQUE INDEX "Team_manager_id_key" ON "Team"("manager_id");
CREATE TABLE "new_Employee" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "type" INTEGER NOT NULL,
    "registration" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "date_started" DATETIME NOT NULL,
    "isManager" BOOLEAN NOT NULL DEFAULT false,
    "manager_id" INTEGER NOT NULL
);
INSERT INTO "new_Employee" ("date_started", "id", "name", "password", "registration", "type") SELECT "date_started", "id", "name", "password", "registration", "type" FROM "Employee";
DROP TABLE "Employee";
ALTER TABLE "new_Employee" RENAME TO "Employee";
CREATE UNIQUE INDEX "Employee_registration_key" ON "Employee"("registration");
CREATE UNIQUE INDEX "Employee_manager_id_key" ON "Employee"("manager_id");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
