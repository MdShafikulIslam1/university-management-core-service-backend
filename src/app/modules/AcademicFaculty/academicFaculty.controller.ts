import httpStatus from 'http-status';
import { AcademicFacultyService } from './academicFaculty.service';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import pick from '../../../shared/pick';
import { academicFacultyFilterableFields } from './academicFaculty.constant';
import { paginationOptionFields } from '../../../common/paginationOptions';

const create = catchAsync(async (req, res) => {
  const { ...data } = req.body;
  const result = await AcademicFacultyService.create(data);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Successfully created an AcademicFaculty',
    data: result,
  });
});

const getAll = catchAsync(async (req, res) => {
  const filters = pick(req.query, academicFacultyFilterableFields);
  const paginationOptions = pick(req.query, paginationOptionFields);
  const result = await AcademicFacultyService.getAll(
    filters,
    paginationOptions
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Successfully got all AcademicFaculties',
    data: result,
  });
});

const getSingle = catchAsync(async (req, res) => {
  const result = await AcademicFacultyService.getSingle(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Successfully got an AcademicFaculty',
    data: result,
  });
});

export const AcademicFacultyController = {
  create,
  getAll,
  getSingle,
};
