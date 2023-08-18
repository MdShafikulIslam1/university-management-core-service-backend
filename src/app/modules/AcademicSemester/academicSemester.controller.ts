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
    message: 'Successfully create a AcademicSemester',
    data: result,
  });
});
export const AcademicSemesterController = {
  create,
  getAll,
};
