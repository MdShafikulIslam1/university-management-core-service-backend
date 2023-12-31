import httpStatus from 'http-status';
import sendResponse from '../../../shared/sendResponse';
import catchAsync from '../../../shared/catchAsync';
import { BuildingService } from './building.service';
import pick from '../../../shared/pick';
import { paginationOptionFields } from '../../../common/paginationOptions';
import { buildingFilterableFields } from './building.constant';

const create = catchAsync(async (req, res) => {
  const result = await BuildingService.create(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Successfully create a Building',
    data: result,
  });
});
const getAll = catchAsync(async (req, res) => {
  const filters = pick(req.query, buildingFilterableFields);
  const paginationOptions = pick(req.query, paginationOptionFields);
  const result = await BuildingService.getAll(filters, paginationOptions);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Successfully Get all AcademicSemester',
    data: result,
  });
});
const getSingle = catchAsync(async (req, res) => {
  const result = await BuildingService.getSingle(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Successfully Get a Building data',
    data: result,
  });
});
const deleteOne = catchAsync(async (req, res) => {
  const result = await BuildingService.deleteOne(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Successfully Delete a Building',
    data: result,
  });
});
const updateOne = catchAsync(async (req, res) => {
  const result = await BuildingService.updateOne(req.params.id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Successfully Update a Building',
    data: result,
  });
});

const deleteAllData = catchAsync(async (req, res) => {
  const result = await BuildingService.deleteAllData();
  res.status(httpStatus.OK).json({
    data: result,
  });
});
export const BuildingController = {
  create,
  getAll,
  getSingle,
  deleteOne,
  deleteAllData,
  updateOne,
};
