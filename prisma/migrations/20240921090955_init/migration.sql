/*
  Warnings:

  - You are about to drop the column `achieved_date` on the `achievement_dates` table. All the data in the column will be lost.
  - You are about to drop the column `nicca_id` on the `achievement_dates` table. All the data in the column will be lost.
  - You are about to drop the column `saurustype` on the `niccas` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `niccas` table. All the data in the column will be lost.
  - You are about to drop the column `nicca_id` on the `weeks` table. All the data in the column will be lost.
  - Added the required column `achievedDate` to the `achievement_dates` table without a default value. This is not possible if the table is not empty.
  - Added the required column `niccaId` to the `achievement_dates` table without a default value. This is not possible if the table is not empty.
  - Added the required column `saurusType` to the `niccas` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `niccas` table without a default value. This is not possible if the table is not empty.
  - Added the required column `niccaId` to the `weeks` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_achievement_dates" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "niccaId" TEXT NOT NULL,
    "achievedDate" DATETIME NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "achievement_dates_niccaId_fkey" FOREIGN KEY ("niccaId") REFERENCES "niccas" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_achievement_dates" ("createdAt", "id", "updatedAt") SELECT "createdAt", "id", "updatedAt" FROM "achievement_dates";
DROP TABLE "achievement_dates";
ALTER TABLE "new_achievement_dates" RENAME TO "achievement_dates";
CREATE UNIQUE INDEX "achievement_dates_niccaId_achievedDate_key" ON "achievement_dates"("niccaId", "achievedDate");
CREATE TABLE "new_niccas" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "saurusType" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "niccas_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_niccas" ("createdAt", "id", "title", "updatedAt") SELECT "createdAt", "id", "title", "updatedAt" FROM "niccas";
DROP TABLE "niccas";
ALTER TABLE "new_niccas" RENAME TO "niccas";
CREATE TABLE "new_weeks" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "niccaId" TEXT NOT NULL,
    "monday" BOOLEAN NOT NULL DEFAULT false,
    "tuesday" BOOLEAN NOT NULL DEFAULT false,
    "wednesday" BOOLEAN NOT NULL DEFAULT false,
    "thursday" BOOLEAN NOT NULL DEFAULT false,
    "friday" BOOLEAN NOT NULL DEFAULT false,
    "saturday" BOOLEAN NOT NULL DEFAULT false,
    "sunday" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "weeks_niccaId_fkey" FOREIGN KEY ("niccaId") REFERENCES "niccas" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_weeks" ("friday", "id", "monday", "saturday", "sunday", "thursday", "tuesday", "wednesday") SELECT "friday", "id", "monday", "saturday", "sunday", "thursday", "tuesday", "wednesday" FROM "weeks";
DROP TABLE "weeks";
ALTER TABLE "new_weeks" RENAME TO "weeks";
CREATE UNIQUE INDEX "weeks_niccaId_key" ON "weeks"("niccaId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
