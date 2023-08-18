import { PrismaClient, AcademicSemester } from '@prisma/client';

const prisma = new PrismaClient();
const create = async (data: AcademicSemester): Promise<AcademicSemester> => {
  const result = await prisma.academicSemester.create({
    data,
  });
  return result;
};
const getAll = async (): Promise<AcademicSemester[]> => {
  const result = await prisma.academicSemester.findMany();
  return result;
};
export const AcademicSemesterService = {
  create,
  getAll,
};
