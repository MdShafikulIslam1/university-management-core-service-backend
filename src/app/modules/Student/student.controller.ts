import httpStatus from 'http-status';
import sendResponse from '../../../shared/sendResponse';
import { StudentService } from './student.service';
import catchAsync from '../../../shared/catchAsync';
import { paginationOptionFields } from '../../../common/paginationOptions';
import pick from '../../../shared/pick';
import { studentFilterableFields } from './student.constant';

const create = catchAsync(async (req, res) => {
  const { ...data } = req.body;
  const result = await StudentService.create(data);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Successfully create a Student',
    data: result,
  });
});

const getAll = catchAsync(async (req, res) => {
  const filters = pick(req.query, studentFilterableFields);
  const paginationOptions = pick(req.query, paginationOptionFields);
  const result = await StudentService.getAll(filters, paginationOptions);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Successfully Get all Students',
    data: result,
  });
});

const getSingle = catchAsync(async (req, res) => {
  const result = await StudentService.getSingle(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Successfully Get a Student',
    data: result,
  });
});

export const StudentController = {
  create,
  getAll,
  getSingle,
};
