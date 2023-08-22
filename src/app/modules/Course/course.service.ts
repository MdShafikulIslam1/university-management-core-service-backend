/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
import prisma from '../../../shared/prisma';
import { ICourseWithPrerequisite } from './course.interface';
import ApiError from '../../../error/ApiError';
import httpStatus from 'http-status';

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

export const CourseService = {
  create,
};
