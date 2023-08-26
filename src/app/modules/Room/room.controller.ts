import httpStatus from 'http-status';
import sendResponse from '../../../shared/sendResponse';
import catchAsync from '../../../shared/catchAsync';
import { RoomService } from './room.service';
import pick from '../../../shared/pick';
import { roomFilterableFields } from './room.constant';
import { paginationOptionFields } from '../../../common/paginationOptions';

const create = catchAsync(async (req, res) => {
  const result = await RoomService.create(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Successfully create a Room',
    data: result,
  });
});
const getAll = catchAsync(async (req, res) => {
  const filters = pick(req.query, roomFilterableFields);
  const paginationOptions = pick(req.query, paginationOptionFields);
  const result = await RoomService.getAll(filters, paginationOptions);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Successfully Get all Room',
    data: result,
  });
});

const getSingle = catchAsync(async (req, res) => {
  const result = await RoomService.getSingle(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Successfully Get a Room',
    data: result,
  });
});
const deleteOne = catchAsync(async (req, res) => {
  const result = await RoomService.deleteOne(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Successfully Delete a Room',
    data: result,
  });
});
const updateOne = catchAsync(async (req, res) => {
  const result = await RoomService.updateOne(req.params.id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Successfully Update a Room',
    data: result,
  });
});

const deleteAllData = catchAsync(async (req, res) => {
  const result = await RoomService.deleteAllData();
  res.status(httpStatus.OK).json({
    data: result,
  });
});

export const RoomController = {
  create,
  getAll,
  getSingle,
  updateOne,
  deleteOne,
  deleteAllData,
};
