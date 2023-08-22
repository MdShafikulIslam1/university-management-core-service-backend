import httpStatus from 'http-status';
import sendResponse from '../../../shared/sendResponse';
import catchAsync from '../../../shared/catchAsync';
import { BuildingService } from './building.service';

const create = catchAsync(async (req, res) => {
  const result = await BuildingService.create(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Successfully create a Building',
    data: result,
  });
});

export const BuildingController = {
  create,
};
