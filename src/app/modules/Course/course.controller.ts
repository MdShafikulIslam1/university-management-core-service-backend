import httpStatus from 'http-status';
import sendResponse from '../../../shared/sendResponse';
import catchAsync from '../../../shared/catchAsync';
import { CourseService } from './course.service';

const create = catchAsync(async (req, res) => {
  const result = await CourseService.create(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Successfully create a Course',
    data: result,
  });
});

export const CourseController = {
  create,
};
