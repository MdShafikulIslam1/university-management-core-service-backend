import { AcademicSemester, Prisma } from '@prisma/client';
import { IPaginationOptions } from '../../../interfaces/paginationOptions';
import { IAcademicSemesterFilterableFields } from './academicSemester.interface';
import { paginationHelpers } from '../../../helpers/paginationHelpers';
import { academicSemesterSearchableFields } from './academicSemester.constant';
import { IGenericResponse } from '../../../interfaces/common';
import prisma from '../../../shared/prisma';

const create = async (data: AcademicSemester): Promise<AcademicSemester> => {
  const result = await prisma.academicSemester.create({
    data,
  });
  return result;
};
const getAll = async (
  filters: IAcademicSemesterFilterableFields,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<AcademicSemester[]>> => {
  const { searchTerm, ...filtersData } = filters;
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);
  // sorting
  let orderBy = {};
  if (sortBy && sortOrder) {
    orderBy = {
      [sortBy]: sortOrder,
    };
  }
  const andConditions = [];

  // searching;
  if (searchTerm) {
    andConditions.push({
      OR: academicSemesterSearchableFields.map(field => ({
        [field]: {
          contains: searchTerm,
          mode: 'insensitive',
        },
      })),
    });
  }
  //filtering
  if (filtersData) {
    const filterKeys = Object.keys(filtersData) as (keyof typeof filtersData)[];
    filterKeys.forEach(key => {
      if (filtersData[key]) {
        const filter: Record<string, unknown> = {};
        filter[key] = { equals: filtersData[key] };
        andConditions.push(filter);
      }
    });
  }
  const whereConditions: Prisma.AcademicSemesterWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.academicSemester.findMany({
    where: whereConditions,
  });
  const total = await prisma.academicSemester.count({
    where: whereConditions,
    skip,
    take: limit,
    orderBy,
  });
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingle = async (id: string): Promise<AcademicSemester | null> => {
  const result = await prisma.academicSemester.findUnique({
    where: {
      id,
    },
  });
  return result;
};

const deleteOne = async (id: string): Promise<AcademicSemester | null> => {
  const result = await prisma.academicSemester.delete({
    where: {
      id,
    },
  });
  return result;
};
const updateOne = async (
  id: string,
  data: Partial<AcademicSemester>
): Promise<AcademicSemester | null> => {
  const result = await prisma.academicSemester.update({
    where: {
      id,
    },
    data,
  });
  return result;
};
// MOST DANGEROUS
const deleteAllData = async () => {
  const result = await prisma.academicSemester.deleteMany();
  return result;
};
export const AcademicSemesterService = {
  create,
  getAll,
  getSingle,
  deleteOne,
  updateOne,
  deleteAllData,
};
