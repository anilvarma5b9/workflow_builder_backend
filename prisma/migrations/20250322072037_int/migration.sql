/*
  Warnings:

  - You are about to alter the column `edges_count` on the `UserWorkflow` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.
  - You are about to alter the column `nodes_count` on the `UserWorkflow` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_UserWorkflow" (
    "workflow_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "user_id" INTEGER NOT NULL,
    "workflow_name" TEXT NOT NULL,
    "workflow_description" TEXT NOT NULL,
    "nodes_count" INTEGER NOT NULL,
    "edges_count" INTEGER NOT NULL,
    "workflow_status" TEXT NOT NULL DEFAULT 'Pending',
    "workflow_data" JSONB NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "UserWorkflow_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User" ("user_id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_UserWorkflow" ("createdAt", "edges_count", "nodes_count", "updatedAt", "user_id", "workflow_data", "workflow_description", "workflow_id", "workflow_name", "workflow_status") SELECT "createdAt", "edges_count", "nodes_count", "updatedAt", "user_id", "workflow_data", "workflow_description", "workflow_id", "workflow_name", "workflow_status" FROM "UserWorkflow";
DROP TABLE "UserWorkflow";
ALTER TABLE "new_UserWorkflow" RENAME TO "UserWorkflow";
CREATE INDEX "UserWorkflow_user_id_idx" ON "UserWorkflow"("user_id");
CREATE INDEX "UserWorkflow_workflow_status_idx" ON "UserWorkflow"("workflow_status");
CREATE INDEX "UserWorkflow_workflow_name_idx" ON "UserWorkflow"("workflow_name");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
