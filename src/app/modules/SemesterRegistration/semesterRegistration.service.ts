import {
  Prisma,
  SemesterRegistration,
  SemesterRegistrationStatus,
} from '@prisma/client';
import prisma from '../../../shared/prisma';
import ApiError from '../../../error/ApiError';
import httpStatus from 'http-status';
import { ISemesterRegistrationFilterableFields } from './semesterRegistration.interface';
import { IPaginationOptions } from '../../../interfaces/paginationOptions';
import { IGenericResponse } from '../../../interfaces/common';
import { paginationHelpers } from '../../../helpers/paginationHelpers';
import { semesterRegistrationSearchableFields } from './semesterRegistration.constant';

const create = async (
  data: SemesterRegistration
): Promise<SemesterRegistration> => {
  const isSemesterRegistrationUpcomingOrOngoing =
    await prisma.semesterRegistration.findFirst({
      where: {
        OR: [
          {
            status: SemesterRegistrationStatus.UPCOMING,
          },
          {
            status: SemesterRegistrationStatus.ONGOING,
          },
        ],
      },
    });
  if (isSemesterRegistrationUpcomingOrOngoing) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      `This semester is ${isSemesterRegistrationUpcomingOrOngoing.status}`
    );
  }
  const result = await prisma.semesterRegistration.create({
    data,
  });
  return result;
};

const getAll = async (
  filters: ISemesterRegistrationFilterableFields,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<SemesterRegistration[]>> => {
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
      OR: semesterRegistrationSearchableFields.map(field => ({
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
  const whereConditions: Prisma.SemesterRegistrationWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.semesterRegistration.findMany({
    where: whereConditions,
    orderBy,
    skip,
    take: limit,
    include: {
      academicSemester: true,
    },
  });
  const total = await prisma.semesterRegistration.count({
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

const getSingle = async (id: string): Promise<SemesterRegistration | null> => {
  const result = await prisma.semesterRegistration.findUnique({
    where: {
      id,
    },
  });
  return result;
};
const deleteOne = async (id: string): Promise<SemesterRegistration | null> => {
  const result = await prisma.semesterRegistration.delete({
    where: {
      id,
    },
  });
  return result;
};
const updateOne = async (
  id: string,
  data: Partial<SemesterRegistration>
): Promise<SemesterRegistration | null> => {
  const result = await prisma.semesterRegistration.update({
    where: {
      id,
    },
    data,
  });
  return result;
};
// MOST DANGEROUS
const deleteAllData = async () => {
  const result = await prisma.semesterRegistration.deleteMany();
  return result;
};
export const SemesterRegistrationService = {
  create,
  getAll,
  getSingle,
  deleteAllData,
  deleteOne,
  updateOne,
};
