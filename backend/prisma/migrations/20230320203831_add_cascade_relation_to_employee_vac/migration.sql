-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Team" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "manager_id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "sub_team" TEXT,
    CONSTRAINT "Team_manager_id_fkey" FOREIGN KEY ("manager_id") REFERENCES "Employee" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Team" ("id", "manager_id", "name", "sub_team") SELECT "id", "manager_id", "name", "sub_team" FROM "Team";
DROP TABLE "Team";
ALTER TABLE "new_Team" RENAME TO "Team";
CREATE UNIQUE INDEX "Team_manager_id_key" ON "Team"("manager_id");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
