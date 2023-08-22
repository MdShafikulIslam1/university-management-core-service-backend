import express from 'express';
import { RoomController } from './room.controller';
import validateRequest from '../../middlewares/zodValidation';
import { RoomZodSchema } from './room.validation';
const router = express.Router();
router.post(
  '/create-room',
  validateRequest(RoomZodSchema.create),
  RoomController.create
);
export const RoomRoutes = router;
