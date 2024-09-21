-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_niccas" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "saurusType" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'active',
    "completedSets" INTEGER NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "niccas_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_niccas" ("createdAt", "id", "saurusType", "title", "updatedAt", "userId") SELECT "createdAt", "id", "saurusType", "title", "updatedAt", "userId" FROM "niccas";
DROP TABLE "niccas";
ALTER TABLE "new_niccas" RENAME TO "niccas";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
