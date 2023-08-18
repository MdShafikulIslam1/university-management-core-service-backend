import { PrismaClient, AcademicSemester } from '@prisma/client';
import { IPaginationOptions } from '../../../interfaces/paginationOptions';
import { IAcademicFilterableFields } from './academicSemester.interface';
import { paginationHelpers } from '../../../helpers/paginationHelpers';

const prisma = new PrismaClient();
const create = async (data: AcademicSemester): Promise<AcademicSemester> => {
  const result = await prisma.academicSemester.create({
    data,
  });
  return result;
};
const getAll = async (
  filters: IAcademicFilterableFields,
  paginationOptions: IPaginationOptions
): Promise<AcademicSemester[]> => {
  const { searchTerm, ...filtersData } = filters;
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);
  let orderBy = {};
  if (sortBy && sortOrder) {
    orderBy = {
      [sortBy]: sortOrder,
    };
  }
  console.log(orderBy);
  const result = await prisma.academicSemester.findMany({
    skip,
    take: limit,
    orderBy,
  });
  return result;
};
export const AcademicSemesterService = {
  create,
  getAll,
};
