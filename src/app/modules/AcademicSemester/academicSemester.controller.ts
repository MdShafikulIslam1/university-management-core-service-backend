import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { AcademicSemesterService } from './academicSemester.service';
import pick from '../../../shared/pick';
import { paginationOptionFields } from '../../../common/paginationOptions';
import { academicSemesterFilterableFields } from './academicSemester.constant';

const create = catchAsync(async (req, res) => {
  const { ...data } = req.body;
  const result = await AcademicSemesterService.create(data);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Successfully create a AcademicSemester',
    data: result,
  });
});
const getAll = catchAsync(async (req, res) => {
  const filters = pick(req.query, academicSemesterFilterableFields);
  const paginationOptions = pick(req.query, paginationOptionFields);
  const result = await AcademicSemesterService.getAll(
    filters,
    paginationOptions
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Successfully Get all AcademicSemester',
    data: result,
  });
});
const getSingle = catchAsync(async (req, res) => {
  const result = await AcademicSemesterService.getSingle(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Successfully Get a AcademicSemester',
    data: result,
  });
});
const deleteOne = catchAsync(async (req, res) => {
  const result = await AcademicSemesterService.deleteOne(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Successfully Delete a AcademicSemester',
    data: result,
  });
});
const updateOne = catchAsync(async (req, res) => {
  const result = await AcademicSemesterService.updateOne(
    req.params.id,
    req.body
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Successfully Update a AcademicSemester',
    data: result,
  });
});

const deleteAllData = catchAsync(async (req, res) => {
  const result = await AcademicSemesterService.deleteAllData();
  res.status(httpStatus.OK).json({
    data: result,
  });
});
export const AcademicSemesterController = {
  create,
  getAll,
  getSingle,
  deleteOne,
  updateOne,
  deleteAllData,
};
