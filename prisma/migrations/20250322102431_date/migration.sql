/*
  Warnings:

  - You are about to drop the column `createdAt` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `UserWorkflow` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `UserWorkflow` table. All the data in the column will be lost.
  - Added the required column `modified_date_time` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `modified_date_time` to the `UserWorkflow` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "user_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "added_date_time" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modified_date_time" DATETIME NOT NULL
);
INSERT INTO "new_User" ("email", "name", "password", "user_id") SELECT "email", "name", "password", "user_id" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
CREATE TABLE "new_UserWorkflow" (
    "workflow_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "user_id" INTEGER NOT NULL,
    "workflow_name" TEXT NOT NULL,
    "workflow_description" TEXT NOT NULL,
    "nodes_count" INTEGER NOT NULL,
    "edges_count" INTEGER NOT NULL,
    "workflow_status" TEXT NOT NULL DEFAULT 'Pending',
    "workflow_data" JSONB NOT NULL,
    "added_date_time" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modified_date_time" DATETIME NOT NULL,
    CONSTRAINT "UserWorkflow_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User" ("user_id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_UserWorkflow" ("edges_count", "nodes_count", "user_id", "workflow_data", "workflow_description", "workflow_id", "workflow_name", "workflow_status") SELECT "edges_count", "nodes_count", "user_id", "workflow_data", "workflow_description", "workflow_id", "workflow_name", "workflow_status" FROM "UserWorkflow";
DROP TABLE "UserWorkflow";
ALTER TABLE "new_UserWorkflow" RENAME TO "UserWorkflow";
CREATE INDEX "UserWorkflow_user_id_idx" ON "UserWorkflow"("user_id");
CREATE INDEX "UserWorkflow_workflow_status_idx" ON "UserWorkflow"("workflow_status");
CREATE INDEX "UserWorkflow_workflow_name_idx" ON "UserWorkflow"("workflow_name");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
