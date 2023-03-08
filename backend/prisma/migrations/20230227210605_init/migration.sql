-- CreateTable
CREATE TABLE "Manager" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "registration" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Employee" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "type" INTEGER NOT NULL,
    "registration" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "date_started" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Team" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "manager_id" INTEGER NOT NULL,
    "employee_id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "sub_team" TEXT,
    CONSTRAINT "Team_manager_id_fkey" FOREIGN KEY ("manager_id") REFERENCES "Manager" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Team_employee_id_fkey" FOREIGN KEY ("employee_id") REFERENCES "Employee" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Vacation" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "team_id" INTEGER NOT NULL,
    "employee_id" INTEGER NOT NULL,
    "date_start" DATETIME NOT NULL,
    "date_end" DATETIME NOT NULL,
    "status" INTEGER NOT NULL DEFAULT 0,
    CONSTRAINT "Vacation_team_id_fkey" FOREIGN KEY ("team_id") REFERENCES "Team" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Vacation_employee_id_fkey" FOREIGN KEY ("employee_id") REFERENCES "Employee" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Team_employee" (
    "team_id" INTEGER NOT NULL,
    "employee_id" INTEGER NOT NULL,

    PRIMARY KEY ("team_id", "employee_id"),
    CONSTRAINT "Team_employee_team_id_fkey" FOREIGN KEY ("team_id") REFERENCES "Team" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Team_employee_employee_id_fkey" FOREIGN KEY ("employee_id") REFERENCES "Employee" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Vacation_data" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "employee_id" INTEGER NOT NULL,
    "days_remaining" INTEGER NOT NULL DEFAULT 30,
    "date_last_vacation" DATETIME,
    "fortnigth" BOOLEAN,
    CONSTRAINT "Vacation_data_employee_id_fkey" FOREIGN KEY ("employee_id") REFERENCES "Employee" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Manager_email_key" ON "Manager"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Manager_registration_key" ON "Manager"("registration");

-- CreateIndex
CREATE UNIQUE INDEX "Employee_registration_key" ON "Employee"("registration");

-- CreateIndex
CREATE UNIQUE INDEX "Team_manager_id_key" ON "Team"("manager_id");

-- CreateIndex
CREATE UNIQUE INDEX "Team_employee_id_key" ON "Team"("employee_id");

-- CreateIndex
CREATE UNIQUE INDEX "Vacation_data_employee_id_key" ON "Vacation_data"("employee_id");
