import { AcademicDepartmentService } from './academicDepartment.service';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import pick from '../../../shared/pick';
import { academicDepartmentFilterableFields } from './academicDepartment.constant';
import { paginationOptionFields } from '../../../common/paginationOptions';
import httpStatus from 'http-status';

const create = catchAsync(async (req, res) => {
  const { ...data } = req.body;
  const result = await AcademicDepartmentService.create(data);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Successfully created an AcademicDepartment',
    data: result,
  });
});

const getAll = catchAsync(async (req, res) => {
  const filters = pick(req.query, academicDepartmentFilterableFields);
  const paginationOptions = pick(req.query, paginationOptionFields);
  const result = await AcademicDepartmentService.getAll(
    filters,
    paginationOptions
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Successfully got all AcademicDepartments',
    data: result,
  });
});

const getSingle = catchAsync(async (req, res) => {
  const result = await AcademicDepartmentService.getSingle(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Successfully got an AcademicDepartment',
    data: result,
  });
});
const deleteOne = catchAsync(async (req, res) => {
  const result = await AcademicDepartmentService.deleteOne(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Successfully Delete a Academic Department',
    data: result,
  });
});
const updateOne = catchAsync(async (req, res) => {
  const result = await AcademicDepartmentService.updateOne(
    req.params.id,
    req.body
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Successfully Update a Academic Department',
    data: result,
  });
});

const deleteAllData = catchAsync(async (req, res) => {
  const result = await AcademicDepartmentService.deleteAllData();
  res.status(httpStatus.OK).json({
    data: result,
  });
});
export const AcademicDepartmentController = {
  create,
  getAll,
  getSingle,
  deleteOne,
  deleteAllData,
  updateOne,
};
