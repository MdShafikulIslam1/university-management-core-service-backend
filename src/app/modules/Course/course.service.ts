/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
import prisma from '../../../shared/prisma';
import {
  ICourseFilterableFields,
  ICourseWithPrerequisite,
} from './course.interface';
import ApiError from '../../../error/ApiError';
import httpStatus from 'http-status';
import { Course, CourseFaculty, Prisma } from '@prisma/client';
import { IGenericResponse } from '../../../interfaces/common';
import { paginationHelpers } from '../../../helpers/paginationHelpers';
import { IPaginationOptions } from '../../../interfaces/paginationOptions';
import { courseSearchableFields } from './course.constant';

const create = async (data: ICourseWithPrerequisite): Promise<any> => {
  const { prerequisiteCourses, ...courseData } = data;
  const newCourse = await prisma.$transaction(async ts => {
    const result = await ts.course.create({
      data: courseData,
    });
    if (!result) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create course');
    }
    if (prerequisiteCourses && prerequisiteCourses.length > 0) {
      for (let index = 0; index < prerequisiteCourses.length; index++) {
        const coursePrerequisite = await ts.courseToPrerequisite.create({
          data: {
            courseId: result.id,
            prerequisiteId: prerequisiteCourses[index].courseId,
          },
        });
        console.log(coursePrerequisite);
      }
    }
    return result;
  });
  if (newCourse) {
    const responseData = await prisma.course.findUnique({
      where: {
        id: newCourse.id,
      },
      include: {
        prerequisite: {
          include: {
            prerequisite: true,
          },
        },
        prerequisiteFor: {
          include: {
            course: true,
          },
        },
      },
    });
    return responseData;
  }
  throw new ApiError(httpStatus.BAD_REQUEST, 'failed to create course');
};
const getAll = async (
  filters: ICourseFilterableFields,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<Course[]>> => {
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
      OR: courseSearchableFields.map(field => ({
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
  const whereConditions: Prisma.CourseWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.course.findMany({
    where: whereConditions,
    orderBy,
    skip,
    take: limit,
  });
  const total = await prisma.course.count({
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

const getSingle = async (id: string): Promise<Course | null> => {
  const result = await prisma.course.findUnique({
    where: {
      id,
    },
    include: {
      prerequisite: {
        include: {
          prerequisite: true,
        },
      },
      prerequisiteFor: {
        include: {
          course: true,
        },
      },
    },
  });
  return result;
};
const deleteOne = async (id: string): Promise<Course | null> => {
  const result = await prisma.course.delete({
    where: {
      id,
    },
  });
  return result;
};
const updateOne = async (
  id: string,
  data: ICourseWithPrerequisite
): Promise<Course | null> => {
  const { prerequisiteCourses, ...courseData } = data;
  await prisma.$transaction(async transactionClient => {
    const result = await transactionClient.course.update({
      where: {
        id,
      },
      data: courseData,
    });
    if (!result) {
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        'Failed to update this course'
      );
    }
    if (prerequisiteCourses && prerequisiteCourses.length > 0) {
      const deletedPrerequisite = prerequisiteCourses.filter(
        coursePrerequisite =>
          coursePrerequisite.courseId && coursePrerequisite?.isDeleted
      );
      const newPrerequisite = prerequisiteCourses.filter(
        coursePrerequisite =>
          coursePrerequisite.courseId && !coursePrerequisite.isDeleted
      );

      for (let index = 0; index < deletedPrerequisite.length; index++) {
        await transactionClient.courseToPrerequisite.deleteMany({
          where: {
            AND: [
              {
                courseId: id,
              },
              {
                prerequisiteId: deletedPrerequisite[index].courseId,
              },
            ],
          },
        });
      }

      for (let index = 0; index < newPrerequisite.length; index++) {
        await transactionClient.courseToPrerequisite.create({
          data: {
            courseId: id,
            prerequisiteId: newPrerequisite[index].courseId,
          },
        });
      }
    }

    return result;
  });

  const responseData = await prisma.course.findUnique({
    where: {
      id,
    },
    include: {
      prerequisite: {
        include: {
          prerequisite: true,
        },
      },
      prerequisiteFor: {
        include: {
          course: true,
        },
      },
    },
  });
  return responseData;
};
// MOST DANGEROUS
const deleteAllData = async () => {
  const result = await prisma.course.deleteMany();
  return result;
};

const assignFaculty = async (
  courseId: string,
  payload: string[]
): Promise<CourseFaculty[]> => {
  await prisma.courseFaculty.createMany({
    data: payload.map(faculty => ({
      courseId,
      facultyId: faculty,
    })),
  });
  const result = await prisma.courseFaculty.findMany({
    where: {
      courseId,
    },
    include: {
      course: true,
      faculty: true,
    },
  });
  return result;
};
const removeFaculty = async (
  courseId: string,
  payload: string[]
): Promise<CourseFaculty[] | null> => {
  await prisma.courseFaculty.deleteMany({
    where: {
      courseId,
      facultyId: {
        in: payload,
      },
    },
  });
  const result = await prisma.courseFaculty.findMany({
    where: {
      courseId,
    },
    include: {
      course: true,
      faculty: true,
    },
  });
  return result;
};
export const CourseService = {
  create,
  getAll,
  getSingle,
  deleteAllData,
  deleteOne,
  updateOne,
  assignFaculty,
  removeFaculty,
};
