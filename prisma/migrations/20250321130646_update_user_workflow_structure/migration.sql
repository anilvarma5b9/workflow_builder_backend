/*
  Warnings:

  - You are about to drop the column `workflowJsonData` on the `UserWorkflow` table. All the data in the column will be lost.
  - Added the required column `updatedAt` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `workflow_data` to the `UserWorkflow` table without a default value. This is not possible if the table is not empty.
  - Added the required column `workflow_name` to the `UserWorkflow` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_User" ("email", "id", "name", "password") SELECT "email", "id", "name", "password" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
CREATE TABLE "new_UserWorkflow" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER NOT NULL,
    "workflow_name" TEXT NOT NULL,
    "workflow_status" TEXT NOT NULL DEFAULT 'PENDING',
    "workflow_data" JSONB NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "UserWorkflow_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_UserWorkflow" ("createdAt", "id", "updatedAt", "userId") SELECT "createdAt", "id", "updatedAt", "userId" FROM "UserWorkflow";
DROP TABLE "UserWorkflow";
ALTER TABLE "new_UserWorkflow" RENAME TO "UserWorkflow";
CREATE INDEX "UserWorkflow_userId_idx" ON "UserWorkflow"("userId");
CREATE INDEX "UserWorkflow_workflow_status_idx" ON "UserWorkflow"("workflow_status");
CREATE INDEX "UserWorkflow_workflow_name_idx" ON "UserWorkflow"("workflow_name");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
