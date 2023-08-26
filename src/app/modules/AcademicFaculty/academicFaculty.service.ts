import { AcademicFaculty, Prisma } from '@prisma/client';
import { IPaginationOptions } from '../../../interfaces/paginationOptions';
import { IAcademicFacultyFilterableFields } from './academicFaculty.interface';
import { paginationHelpers } from '../../../helpers/paginationHelpers';
import { academicFacultySearchableFields } from './academicFaculty.constant';
import { IGenericResponse } from '../../../interfaces/common';
import prisma from '../../../shared/prisma';

const create = async (data: AcademicFaculty): Promise<AcademicFaculty> => {
  const result = await prisma.academicFaculty.create({
    data,
  });
  return result;
};
const getAll = async (
  filters: IAcademicFacultyFilterableFields,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<AcademicFaculty[]>> => {
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
      OR: academicFacultySearchableFields.map(field => ({
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
  const whereConditions: Prisma.AcademicFacultyWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.academicFaculty.findMany({
    where: whereConditions,
    skip,
    take: limit,
    orderBy,
  });
  const total = await prisma.academicFaculty.count({
    where: whereConditions,
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

const getSingle = async (id: string): Promise<AcademicFaculty | null> => {
  const result = await prisma.academicFaculty.findUnique({
    where: {
      id,
    },
  });
  return result;
};

const deleteOne = async (id: string): Promise<AcademicFaculty | null> => {
  console.log(id);
  const result = await prisma.academicFaculty.delete({
    where: {
      id,
    },
  });
  return result;
};
const updateOne = async (
  id: string,
  data: Partial<AcademicFaculty>
): Promise<AcademicFaculty | null> => {
  const result = await prisma.academicFaculty.update({
    where: {
      id,
    },
    data,
  });
  return result;
};
// MOST DANGEROUS
const deleteAllData = async () => {
  const result = await prisma.academicFaculty.deleteMany();
  return result;
};
export const AcademicFacultyService = {
  create,
  getAll,
  getSingle,
  deleteAllData,
  deleteOne,
  updateOne,
};
