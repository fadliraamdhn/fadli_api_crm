/*
  Warnings:

  - The values [qualified,waiting_approval,won,lost] on the enum `PROJECT_STATUS` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "PROJECT_STATUS_new" AS ENUM ('approval', 'approved', 'rejected');
ALTER TABLE "public"."Project" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "Project" ALTER COLUMN "status" TYPE "PROJECT_STATUS_new" USING ("status"::text::"PROJECT_STATUS_new");
ALTER TYPE "PROJECT_STATUS" RENAME TO "PROJECT_STATUS_old";
ALTER TYPE "PROJECT_STATUS_new" RENAME TO "PROJECT_STATUS";
DROP TYPE "public"."PROJECT_STATUS_old";
ALTER TABLE "Project" ALTER COLUMN "status" SET DEFAULT 'approval';
COMMIT;

-- AlterTable
ALTER TABLE "Project" ALTER COLUMN "status" SET DEFAULT 'approval';
