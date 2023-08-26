import { AcademicDepartment, Prisma } from '@prisma/client';
import { IPaginationOptions } from '../../../interfaces/paginationOptions';
import { IAcademicDepartmentFilterableFields } from './academicDepartment.interface';
import { paginationHelpers } from '../../../helpers/paginationHelpers';
import { academicDepartmentSearchableFields } from './academicDepartment.constant';
import { IGenericResponse } from '../../../interfaces/common';
import prisma from '../../../shared/prisma';

const create = async (
  data: AcademicDepartment
): Promise<AcademicDepartment> => {
  const result = await prisma.academicDepartment.create({
    data,
  });
  return result;
};
const getAll = async (
  filters: IAcademicDepartmentFilterableFields,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<AcademicDepartment[]>> => {
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
      OR: academicDepartmentSearchableFields.map(field => ({
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
  const whereConditions: Prisma.AcademicDepartmentWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.academicDepartment.findMany({
    where: whereConditions,
    skip,
    take: limit,
    orderBy,
  });
  const total = await prisma.academicDepartment.count({
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

const getSingle = async (id: string): Promise<AcademicDepartment | null> => {
  const result = await prisma.academicDepartment.findUnique({
    where: {
      id,
    },
  });
  return result;
};
const deleteOne = async (id: string): Promise<AcademicDepartment | null> => {
  const result = await prisma.academicDepartment.delete({
    where: {
      id,
    },
  });
  return result;
};
const updateOne = async (
  id: string,
  data: Partial<AcademicDepartment>
): Promise<AcademicDepartment | null> => {
  const result = await prisma.academicDepartment.update({
    where: {
      id,
    },
    data,
  });
  return result;
};
// MOST DANGEROUS
const deleteAllData = async () => {
  const result = await prisma.academicDepartment.deleteMany();
  return result;
};
export const AcademicDepartmentService = {
  create,
  getAll,
  getSingle,
  deleteOne,
  updateOne,
  deleteAllData,
};
