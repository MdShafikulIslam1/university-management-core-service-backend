/* eslint-disable @typescript-eslint/no-explicit-any */
import { Student, Prisma } from '@prisma/client';
import prisma from '../../../shared/prisma';
import { paginationHelpers } from '../../../helpers/paginationHelpers';
import { IGenericResponse } from '../../../interfaces/common';
import { studentSearchableFields } from './student.constant';
import { IPaginationOptions } from '../../../interfaces/paginationOptions';
import { IStudentFilterableFields } from './student.interface';

const create = async (data: Student): Promise<Student> => {
  const result = await prisma.student.create({
    data,
  });
  return result;
};

const getAll = async (
  filters: IStudentFilterableFields,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<Student[]>> => {
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
      OR: studentSearchableFields.map(field => ({
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
  const whereConditions: Prisma.StudentWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.student.findMany({
    where: whereConditions,
    orderBy,
    skip,
    take: limit,
    include: {
      academicFaculty: true,
      academicDepartment: true,
      academicSemester: true,
    } as Prisma.StudentInclude,
  });
  const total = await prisma.student.count({
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

const getSingle = async (id: string): Promise<Student | null> => {
  const result = await prisma.student.findUnique({
    where: {
      id,
    },
  });
  return result;
};
const deleteOne = async (id: string): Promise<Student | null> => {
  const result = await prisma.student.delete({
    where: {
      id,
    },
  });
  return result;
};
const updateOne = async (
  id: string,
  data: Partial<Student>
): Promise<Student | null> => {
  const result = await prisma.student.update({
    where: {
      id,
    },
    data,
  });
  return result;
};
// MOST DANGEROUS
const deleteAllData = async () => {
  const result = await prisma.student.deleteMany();
  return result;
};
export const StudentService = {
  create,
  getAll,
  getSingle,
  deleteAllData,
  deleteOne,
  updateOne,
};
