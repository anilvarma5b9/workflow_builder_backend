/*
  Warnings:

  - Added the required column `edges_count` to the `UserWorkflow` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nodes_count` to the `UserWorkflow` table without a default value. This is not possible if the table is not empty.
  - Added the required column `workflow_description` to the `UserWorkflow` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_UserWorkflow" (
    "workflow_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "user_id" INTEGER NOT NULL,
    "workflow_name" TEXT NOT NULL,
    "workflow_description" TEXT NOT NULL,
    "nodes_count" TEXT NOT NULL,
    "edges_count" TEXT NOT NULL,
    "workflow_status" TEXT NOT NULL DEFAULT 'Pending',
    "workflow_data" JSONB NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "UserWorkflow_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User" ("user_id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_UserWorkflow" ("createdAt", "updatedAt", "user_id", "workflow_data", "workflow_id", "workflow_name", "workflow_status") SELECT "createdAt", "updatedAt", "user_id", "workflow_data", "workflow_id", "workflow_name", "workflow_status" FROM "UserWorkflow";
DROP TABLE "UserWorkflow";
ALTER TABLE "new_UserWorkflow" RENAME TO "UserWorkflow";
CREATE INDEX "UserWorkflow_user_id_idx" ON "UserWorkflow"("user_id");
CREATE INDEX "UserWorkflow_workflow_status_idx" ON "UserWorkflow"("workflow_status");
CREATE INDEX "UserWorkflow_workflow_name_idx" ON "UserWorkflow"("workflow_name");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
