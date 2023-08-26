import httpStatus from 'http-status';
import sendResponse from '../../../shared/sendResponse';
import { SemesterRegistrationService } from './semesterRegistration.service';
import catchAsync from '../../../shared/catchAsync';
import { paginationOptionFields } from '../../../common/paginationOptions';
import pick from '../../../shared/pick';
import { semesterRegistrationFilterableFields } from './semesterRegistration.constant';

const create = catchAsync(async (req, res) => {
  const result = await SemesterRegistrationService.create({ ...req.body });
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Successfully create a SemesterRegistration',
    data: result,
  });
});

const getAll = catchAsync(async (req, res) => {
  const filters = pick(req.query, semesterRegistrationFilterableFields);
  const paginationOptions = pick(req.query, paginationOptionFields);
  const result = await SemesterRegistrationService.getAll(
    filters,
    paginationOptions
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Successfully Get all SemesterRegistrations',
    data: result,
  });
});

const getSingle = catchAsync(async (req, res) => {
  const result = await SemesterRegistrationService.getSingle(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Successfully Get a SemesterRegistration',
    data: result,
  });
});
const deleteOne = catchAsync(async (req, res) => {
  const result = await SemesterRegistrationService.deleteOne(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Successfully Delete a SemesterRegistration',
    data: result,
  });
});
const updateOne = catchAsync(async (req, res) => {
  const result = await SemesterRegistrationService.updateOne(
    req.params.id,
    req.body
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Successfully Update a SemesterRegistration',
    data: result,
  });
});

const deleteAllData = catchAsync(async (req, res) => {
  const result = await SemesterRegistrationService.deleteAllData();
  res.status(httpStatus.OK).json({
    data: result,
  });
});
export const SemesterRegistrationController = {
  create,
  getAll,
  getSingle,
  deleteAllData,
  deleteOne,
  updateOne,
};
