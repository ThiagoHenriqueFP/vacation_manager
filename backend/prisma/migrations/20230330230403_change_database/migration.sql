-- CreateEnum
CREATE TYPE "Type" AS ENUM ('CLT', 'PJ');

-- CreateTable
CREATE TABLE "Employee" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "type" "Type" NOT NULL,
    "registration" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "date_started" TIMESTAMP(3) NOT NULL,
    "isManager" BOOLEAN NOT NULL DEFAULT false,
    "manager_id" INTEGER,
    "role" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT false,
    "email" TEXT NOT NULL,
    "gmail" TEXT,

    CONSTRAINT "Employee_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Team" (
    "id" SERIAL NOT NULL,
    "manager_id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "sub_team" TEXT,

    CONSTRAINT "Team_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Vacation" (
    "id" SERIAL NOT NULL,
    "team_id" INTEGER NOT NULL,
    "employee_id" INTEGER NOT NULL,
    "date_start" TIMESTAMP(3) NOT NULL,
    "date_end" TIMESTAMP(3) NOT NULL,
    "status" INTEGER DEFAULT 0,

    CONSTRAINT "Vacation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Team_employee" (
    "team_id" INTEGER NOT NULL,
    "employee_id" INTEGER NOT NULL,

    CONSTRAINT "Team_employee_pkey" PRIMARY KEY ("team_id","employee_id")
);

-- CreateTable
CREATE TABLE "Vacation_data" (
    "id" SERIAL NOT NULL,
    "employee_id" INTEGER NOT NULL,
    "days_remaining" INTEGER NOT NULL DEFAULT 30,
    "date_last_vacation" TIMESTAMP(3),
    "fortnigth" BOOLEAN,

    CONSTRAINT "Vacation_data_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Employee_registration_key" ON "Employee"("registration");

-- CreateIndex
CREATE UNIQUE INDEX "Team_manager_id_key" ON "Team"("manager_id");

-- CreateIndex
CREATE UNIQUE INDEX "Vacation_data_employee_id_key" ON "Vacation_data"("employee_id");

-- AddForeignKey
ALTER TABLE "Employee" ADD CONSTRAINT "Employee_manager_id_fkey" FOREIGN KEY ("manager_id") REFERENCES "Employee"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Team" ADD CONSTRAINT "Team_manager_id_fkey" FOREIGN KEY ("manager_id") REFERENCES "Employee"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vacation" ADD CONSTRAINT "Vacation_team_id_fkey" FOREIGN KEY ("team_id") REFERENCES "Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vacation" ADD CONSTRAINT "Vacation_employee_id_fkey" FOREIGN KEY ("employee_id") REFERENCES "Employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Team_employee" ADD CONSTRAINT "Team_employee_team_id_fkey" FOREIGN KEY ("team_id") REFERENCES "Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Team_employee" ADD CONSTRAINT "Team_employee_employee_id_fkey" FOREIGN KEY ("employee_id") REFERENCES "Employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vacation_data" ADD CONSTRAINT "Vacation_data_employee_id_fkey" FOREIGN KEY ("employee_id") REFERENCES "Employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
