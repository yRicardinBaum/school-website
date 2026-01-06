/*
  Warnings:

  - You are about to drop the column `data` on the `activity` table. All the data in the column will be lost.
  - Added the required column `files` to the `activity` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_activity" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "materia" TEXT NOT NULL,
    "unity" TEXT NOT NULL,
    "files" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_activity" ("createdAt", "description", "id", "materia", "name", "unity", "updatedAt") SELECT "createdAt", "description", "id", "materia", "name", "unity", "updatedAt" FROM "activity";
DROP TABLE "activity";
ALTER TABLE "new_activity" RENAME TO "activity";
CREATE INDEX "activity_id_idx" ON "activity"("id");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
