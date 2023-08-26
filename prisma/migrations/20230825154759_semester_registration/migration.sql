-- AlterTable
ALTER TABLE "semesterRegistrations" ALTER COLUMN "status" DROP NOT NULL,
ALTER COLUMN "status" SET DEFAULT 'UPCOMING';
