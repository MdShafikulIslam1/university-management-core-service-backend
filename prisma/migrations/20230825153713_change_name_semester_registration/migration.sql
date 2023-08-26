/*
  Warnings:

  - You are about to drop the `SemesterRegistration` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "SemesterRegistration" DROP CONSTRAINT "SemesterRegistration_semesterId_fkey";

-- DropTable
DROP TABLE "SemesterRegistration";

-- CreateTable
CREATE TABLE "semesterRegistrations" (
    "id" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "status" "SemesterRegistrationStatus" NOT NULL,
    "minCredit" INTEGER NOT NULL DEFAULT 0,
    "maxCredit" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "semesterId" TEXT NOT NULL,

    CONSTRAINT "semesterRegistrations_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "semesterRegistrations" ADD CONSTRAINT "semesterRegistrations_semesterId_fkey" FOREIGN KEY ("semesterId") REFERENCES "academicSemesters"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
