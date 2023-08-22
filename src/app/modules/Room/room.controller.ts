import httpStatus from 'http-status';
import sendResponse from '../../../shared/sendResponse';
import catchAsync from '../../../shared/catchAsync';
import { RoomService } from './room.service';

const create = catchAsync(async (req, res) => {
  const result = await RoomService.create(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Successfully create a Room',
    data: result,
  });
});

export const RoomController = {
  create,
};
