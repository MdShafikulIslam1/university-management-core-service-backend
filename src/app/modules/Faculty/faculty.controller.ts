import httpStatus from 'http-status';
import sendResponse from '../../../shared/sendResponse';
import catchAsync from '../../../shared/catchAsync';
import { paginationOptionFields } from '../../../common/paginationOptions';
import pick from '../../../shared/pick';
import { facultyFilterableFields } from './faculty.constant';
import { FacultyService } from './faculty.service';

const create = catchAsync(async (req, res) => {
  const { ...data } = req.body;
  const result = await FacultyService.create(data);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Successfully create a Faculty',
    data: result,
  });
});

const getAll = catchAsync(async (req, res) => {
  const filters = pick(req.query, facultyFilterableFields);
  const paginationOptions = pick(req.query, paginationOptionFields);
  const result = await FacultyService.getAll(filters, paginationOptions);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Successfully Get all Faculties',
    data: result,
  });
});

const getSingle = catchAsync(async (req, res) => {
  const result = await FacultyService.getSingle(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Successfully Get a Faculty',
    data: result,
  });
});

const deleteOne = catchAsync(async (req, res) => {
  const result = await FacultyService.deleteOne(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Successfully Delete a Faculty',
    data: result,
  });
});
const updateOne = catchAsync(async (req, res) => {
  const result = await FacultyService.updateOne(req.params.id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Successfully Update a Faculty',
    data: result,
  });
});

const deleteAllData = catchAsync(async (req, res) => {
  const result = await FacultyService.deleteAllData();
  res.status(httpStatus.OK).json({
    data: result,
  });
});
const assignCourse = catchAsync(async (req, res) => {
  const result = await FacultyService.assignCourse(
    req.params.id,
    req.body.courses
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Successfully Assign course to Faculty ',
    data: result,
  });
});
const removeCourse = catchAsync(async (req, res) => {
  const result = await FacultyService.removeCourse(
    req.params.id,
    req.body.courses
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Rest courses are here ',
    data: result,
  });
});
export const FacultyController = {
  create,
  getAll,
  getSingle,
  deleteAllData,
  deleteOne,
  updateOne,
  assignCourse,
  removeCourse,
};
