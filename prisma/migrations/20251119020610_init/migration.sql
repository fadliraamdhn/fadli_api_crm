/*
  Warnings:

  - The values [InProgress] on the enum `LEAD_STATUS` will be removed. If these variants are still used in the database, this will fail.
  - The values [approved,rejected] on the enum `PROJECT_STATUS` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "LEAD_STATUS_new" AS ENUM ('New', 'Converted', 'Closed');
ALTER TABLE "public"."Lead" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "Lead" ALTER COLUMN "status" TYPE "LEAD_STATUS_new" USING ("status"::text::"LEAD_STATUS_new");
ALTER TYPE "LEAD_STATUS" RENAME TO "LEAD_STATUS_old";
ALTER TYPE "LEAD_STATUS_new" RENAME TO "LEAD_STATUS";
DROP TYPE "public"."LEAD_STATUS_old";
ALTER TABLE "Lead" ALTER COLUMN "status" SET DEFAULT 'New';
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "PROJECT_STATUS_new" AS ENUM ('qualified', 'waiting_approval', 'won', 'lost');
ALTER TABLE "public"."Project" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "Project" ALTER COLUMN "status" TYPE "PROJECT_STATUS_new" USING ("status"::text::"PROJECT_STATUS_new");
ALTER TYPE "PROJECT_STATUS" RENAME TO "PROJECT_STATUS_old";
ALTER TYPE "PROJECT_STATUS_new" RENAME TO "PROJECT_STATUS";
DROP TYPE "public"."PROJECT_STATUS_old";
ALTER TABLE "Project" ALTER COLUMN "status" SET DEFAULT 'qualified';
COMMIT;

-- AlterTable
ALTER TABLE "Project" ALTER COLUMN "status" SET DEFAULT 'qualified';
