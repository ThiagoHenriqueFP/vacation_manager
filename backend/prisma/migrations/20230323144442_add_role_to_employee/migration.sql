-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Employee" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "type" INTEGER NOT NULL,
    "registration" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "date_started" DATETIME NOT NULL,
    "isManager" BOOLEAN NOT NULL DEFAULT false,
    "manager_id" INTEGER,
    "role" TEXT NOT NULL DEFAULT 'backend',
    "status" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "Employee_manager_id_fkey" FOREIGN KEY ("manager_id") REFERENCES "Employee" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Employee" ("date_started", "id", "isManager", "manager_id", "name", "password", "registration", "type") SELECT "date_started", "id", "isManager", "manager_id", "name", "password", "registration", "type" FROM "Employee";
DROP TABLE "Employee";
ALTER TABLE "new_Employee" RENAME TO "Employee";
CREATE UNIQUE INDEX "Employee_registration_key" ON "Employee"("registration");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
