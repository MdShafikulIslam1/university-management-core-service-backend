import httpStatus from 'http-status';
import sendResponse from '../../../shared/sendResponse';
import catchAsync from '../../../shared/catchAsync';
import { CourseService } from './course.service';
import pick from '../../../shared/pick';
import { paginationOptionFields } from '../../../common/paginationOptions';
import { courseFilterableFields } from './course.constant';

const create = catchAsync(async (req, res) => {
  const result = await CourseService.create(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Successfully create a Course',
    data: result,
  });
});
const getAll = catchAsync(async (req, res) => {
  const filters = pick(req.query, courseFilterableFields);
  const paginationOptions = pick(req.query, paginationOptionFields);
  const result = await CourseService.getAll(filters, paginationOptions);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Successfully Get all Course',
    data: result,
  });
});

const getSingle = catchAsync(async (req, res) => {
  const result = await CourseService.getSingle(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Successfully Get a Course',
    data: result,
  });
});
const deleteOne = catchAsync(async (req, res) => {
  const result = await CourseService.deleteOne(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Successfully Delete a course',
    data: result,
  });
});
const updateOne = catchAsync(async (req, res) => {
  const result = await CourseService.updateOne(req.params.id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Successfully Update a course',
    data: result,
  });
});
const assignFaculty = catchAsync(async (req, res) => {
  const result = await CourseService.assignFaculty(
    req.params.id,
    req.body.faculties
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Successfully Assign faculty into course',
    data: result,
  });
});
const removeFaculty = catchAsync(async (req, res) => {
  const result = await CourseService.removeFaculty(
    req.params.id,
    req.body.faculties
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Rest course with faculty ',
    data: result,
  });
});

const deleteAllData = catchAsync(async (req, res) => {
  const result = await CourseService.deleteAllData();
  res.status(httpStatus.OK).json({
    data: result,
  });
});
export const CourseController = {
  create,
  getAll,
  getSingle,
  deleteAllData,
  deleteOne,
  updateOne,
  assignFaculty,
  removeFaculty,
};
