/*
  Warnings:

  - You are about to drop the column `semesterId` on the `semesterRegistrations` table. All the data in the column will be lost.
  - Added the required column `academicSemesterId` to the `semesterRegistrations` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "semesterRegistrations" DROP CONSTRAINT "semesterRegistrations_semesterId_fkey";

-- AlterTable
ALTER TABLE "semesterRegistrations" DROP COLUMN "semesterId",
ADD COLUMN     "academicSemesterId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "semesterRegistrations" ADD CONSTRAINT "semesterRegistrations_academicSemesterId_fkey" FOREIGN KEY ("academicSemesterId") REFERENCES "academicSemesters"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
