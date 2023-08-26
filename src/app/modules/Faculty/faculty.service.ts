import { CourseFaculty, Faculty, Prisma } from '@prisma/client';
import prisma from '../../../shared/prisma';
import { paginationHelpers } from '../../../helpers/paginationHelpers';
import { IGenericResponse } from '../../../interfaces/common';
import { facultySearchableFields } from './faculty.constant';
import { IPaginationOptions } from '../../../interfaces/paginationOptions';
import { IFacultyFilterableFields } from './faculty.interface';
import ApiError from '../../../error/ApiError';
import httpStatus from 'http-status';

const create = async (data: Faculty): Promise<Faculty> => {
  const result = await prisma.faculty.create({
    data,
  });
  return result;
};

const getAll = async (
  filters: IFacultyFilterableFields,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<Faculty[]>> => {
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
      OR: facultySearchableFields.map(field => ({
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
  const whereConditions: Prisma.FacultyWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.faculty.findMany({
    where: whereConditions,
    orderBy,
    skip,
    take: limit,
    include: {
      academicFaculty: true,
      academicDepartment: true,
      academicSemester: true,
    } as Prisma.FacultyInclude,
  });
  const total = await prisma.faculty.count({
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

const getSingle = async (id: string): Promise<Faculty | null> => {
  const result = await prisma.faculty.findUnique({
    where: {
      id,
    },
  });
  return result;
};

const deleteOne = async (id: string): Promise<Faculty | null> => {
  const result = await prisma.faculty.delete({
    where: {
      id,
    },
  });
  return result;
};
const updateOne = async (
  id: string,
  data: Partial<Faculty>
): Promise<Faculty | null> => {
  const result = await prisma.faculty.update({
    where: {
      id,
    },
    data,
  });
  return result;
};
// MOST DANGEROUS
const deleteAllData = async () => {
  const result = await prisma.faculty.deleteMany();
  return result;
};
const assignCourse = async (
  facultyId: string,
  payload: string[]
): Promise<CourseFaculty[]> => {
  const result = await prisma.courseFaculty.createMany({
    data: payload.map(courseId => ({
      facultyId,
      courseId: courseId,
    })),
  });
  if (!result) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'Failed to assign course to faculty'
    );
  }
  const responseData = await prisma.courseFaculty.findMany({
    where: {
      facultyId,
    },
    include: {
      course: true,
    },
  });
  return responseData;
};

const removeCourse = async (
  facultyId: string,
  courses: string[]
): Promise<CourseFaculty[] | null> => {
  const isExistCourse = await prisma.courseFaculty.findMany({
    where: {
      AND: [
        {
          facultyId,
        },
        {
          courseId: {
            in: courses,
          },
        },
      ],
    },
    include: {
      course: true,
    },
  });
  if (!isExistCourse.length) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'Oops! there is no any course under the faculty'
    );
  }
  const result = await prisma.courseFaculty.deleteMany({
    where: {
      facultyId,
      courseId: {
        in: courses,
      },
    },
  });
  if (!result) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to deleted course');
  }
  const responseData = await prisma.courseFaculty.findMany({
    where: {
      facultyId,
    },
    include: {
      course: true,
    },
  });
  return responseData;
};
export const FacultyService = {
  create,
  getAll,
  getSingle,
  deleteAllData,
  deleteOne,
  updateOne,
  assignCourse,
  removeCourse,
};
